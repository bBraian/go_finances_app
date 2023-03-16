import React from 'react';
import { 
    Container,
    Title,
    Amount
} from './styles';

export function HistoryCard({ color, title, amount }) {
  return (
    <Container color={color}>
        <Title>{title}</Title>
        <Amount>{amount}</Amount>

    </Container>
  );
}