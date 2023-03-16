import React from 'react';
import { 
  Container,
  Icon,
  Title
} from './styles';

const icons = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle'
}

export function TransactionTypeButton({ title, type, isActive, ...rest }) {
  return (
    <Container {...rest} isActive={isActive} type={type}>
        <Icon name={icons[type]} type={type} />
        <Title>
            { title }
        </Title>
    </Container>
  );
}