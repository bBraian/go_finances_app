import React from 'react';
import { Container, Title } from './styles';
import { TouchableOpacityProps } from 'react-native'

export function Button({ title, ...rest }) {
  return (
    <Container {...rest}>
        <Title>{ title }</Title>
    </Container>
  );
}