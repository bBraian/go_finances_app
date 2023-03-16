import React from 'react';
import { 
    Container,
    Title,
    Icon,
    Box,
    CategoryIcon
} from './styles';

export function CategorySelectButton({ title, icon, onPress }) {
  return (
    <Container onPress={onPress}>
        <Box>
          <CategoryIcon name={icon} />
          <Title>{ title }</Title>
        </Box>
          
        <Icon name="chevron-down" />
    </Container>
  );
}