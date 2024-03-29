import React from 'react';
import { FlatList } from 'react-native';
import { Button } from '../../components/Form/Button';
import { categories } from '../../data/categories';
import {
    Container,
    Header,
    Title,
    Category,
    Icon,
    Name,
    Separator,
    Footer
 } from './styles';

export function CategorySelect({ category, setCategory, closeSelectCategory}) {
  return (
    <Container>
        <Header>
            <Title>Categoria</Title>
        </Header>

        <FlatList 
            data={categories}
            style={{flex: 1, width: '100%'}}
            keyExtractor={(item) => item.key}
            renderItem={({item}) => (
                <Category 
                    onPress={() => setCategory(item)}
                    isActive={category.key === item.key}
                >
                    <Icon name={item.icon} />
                    <Name>{item.name}</Name>
                </Category>
            )}
            ItemSeparatorComponent={() => <Separator />}
        />

        <Footer>
            <Button title='Selecionar' onPress={closeSelectCategory} />
        </Footer>

    </Container>
  );
}