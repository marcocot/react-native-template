import React, { ReactNode } from 'react';
import crashlytics from '@react-native-firebase/crashlytics';

type StateType = { hasError: boolean };

export class ErrorBoundary extends React.PureComponent<{}, StateType> {
  constructor(props = {}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): StateType {
    return { hasError: true };
  }

  componentDidCatch(error: Error): void {
    crashlytics().recordError(error);
  }

  render(): ReactNode {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      console.warn('an error has been detected');
    }
    return children;
  }
}
