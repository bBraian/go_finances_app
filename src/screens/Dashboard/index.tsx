import React from 'react';
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';

import { 
  Container, 
  Header,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  UserWrapper,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionList
} from "./styles";

export interface DataListProps extends TransactionCardProps {
  id: string
}

export function Dashboard() {
  const data: DataListProps[] = [
    {
      id: '1',
      type: 'positive',
      title: 'Desenvolvimento de Site',
      amount: 'R$ 12.000,00',
      category: {
        name: 'Vendas',
        icon: 'dollar-sign'
      },
      date: '13/04/2022'
    },
    {
      id: '2',
      type: 'negative',
      title: "Braian's bar",
      amount: 'R$ 54,00',
      category: {
        name: 'Alimentação',
        icon: 'coffee'
      },
      date: '16/04/2022'
    },
    {
      id: '3',
      type: 'negative',
      title: 'Das MEI',
      amount: 'R$ 68,00',
      category: {
        name: 'Empresa',
        icon: 'shopping-bag'
      },
      date: '13/04/2022'
    }
  ]

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/77290279?v=4'}} />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Braian</UserName>
            </User>
          </UserInfo>
          <Icon name="power" />
        </UserWrapper>
        
      </Header>

      <HighlightCards>
        <HighlightCard type='up' title='Entradas' amount='R$ 14.400,00' lastTransaction='Última entrada dia 13 de abril' /> 
        <HighlightCard type='down' title='Saídas' amount='R$ 1.259,00' lastTransaction='Última saída dia 03 de abril' /> 
        <HighlightCard type='total' title='Total' amount='R$ 16.141,00' lastTransaction='01 à 16 de abril' /> 
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionList 
          data={data}
          keyExtractor={ item => item.id }
          renderItem={({ item }) => <TransactionCard data={item} />}
        />

      </Transactions>
    </Container>
  );
}
