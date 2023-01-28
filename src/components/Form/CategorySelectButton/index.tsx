import React from 'react';
import { 
    Container,
    Title,
    Icon,
    Box,
    CategoryIcon
} from './styles';

interface Props {
    title: string;
    onPress: () => void;
    icon: string;
}

export function CategorySelectButton({ title, icon, onPress } : Props) {
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