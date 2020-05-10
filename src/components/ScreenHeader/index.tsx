import React from 'react';
import { Header, Body, Title } from 'native-base';

type PropsType = { title: string };

export const ScreenHeader: React.FC<PropsType> = ({ title }) => (
  <Header>
    <Body>
      <Title>{title}</Title>
    </Body>
  </Header>
);
