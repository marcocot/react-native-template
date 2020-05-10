import React from 'react';
import { Container, Content } from 'native-base';
import { ScreenHeader } from '@app/components/ScreenHeader';

type PropsType = { title?: string; children: React.ReactNode; disableContent?: boolean };

export const Screen: React.FC<PropsType> = ({ title, children, disableContent }) => {
  return (
    <Container>
      {title ? <ScreenHeader title={title} /> : null}
      {disableContent ? children : <Content>{children}</Content>}
    </Container>
  );
};
