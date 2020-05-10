import analytics from '@react-native-firebase/analytics';

type ParamsType = { [key: string]: string | undefined };
type LabelEnumTypes = 'CUSTOM_ACTION';

export const trackEvent = (label: LabelEnumTypes, params?: ParamsType): Promise<void> =>
  analytics().logEvent(label, params);
