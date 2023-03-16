import React from 'react';
import { categories } from '../../data/categories';
import { 
    Container,
    Title,
    Amount,
    Footer,
    Category,
    Icon,
    CategoryName,
    Date,
} from './styles';

export function TransactionCard({ data }) {
    const [ category ] = categories.filter(
        category => category.key === data.category
    );
    return (
        <Container>
            <Title>{ data.name }</Title>

            <Amount type={data.type}>
                { data.type === 'down' && '- ' }
                { data.amount }
            </Amount>

            <Footer>
                <Category>
                    <Icon name={ category.icon } />
                    <CategoryName>{ category.name }</CategoryName>
                </Category>
                <Date>{ data.date }</Date>
            </Footer>
        </Container>
    );
}