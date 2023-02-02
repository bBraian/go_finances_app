import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';
import "intl";
import "intl/locale-data/jsonp/pt-BR";

import { useFocusEffect } from '@react-navigation/native';

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
  TransactionList,
  LoadContainer
} from "./styles";

interface HighlightProps {
  amount: string;
  lastTransaction: string;
}
import { useTheme } from 'styled-components';

interface HighlightData {
  entries: HighlightProps;
  expensive: HighlightProps;
  total: HighlightProps;
}

export interface DataListProps extends TransactionCardProps {
  id: string
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<DataListProps[]>();
  const [highlightData, setHighlightData] = useState<HighlightData>({
    expensive: {amount: 'R$ 0,00', lastTransaction: ' '},
    entries: {amount: 'R$ 0,00', lastTransaction: ' '},
    total: {amount: 'R$ 0,00', lastTransaction: ' '},
  } as HighlightData);
  const theme = useTheme();

  function getLastTransactionDate(collection: DataListProps[], type: 'up' | 'down' ) {
    const lastTransaction = new Date( Math.max.apply(Math, collection
      .filter(transaction => transaction.type === type)
      .map(transaction => new Date(transaction.date).getTime())
    ))

    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', { month: 'long' })}`
  }

  async function loadTransactions() {
    const dataKey = '@gofinances:transactions';

    let entriesSum = 0;
    let expensiveSum = 0;

    try {
      const response = await AsyncStorage.getItem(dataKey);
      const transactions = response ? JSON.parse(response) : [];
  
      const transactionsFormatted: DataListProps[] = transactions
        .map((item: DataListProps) => {
  
          if(item.type === 'up') {
            entriesSum += Number(item.amount);
          } else {
            expensiveSum += Number(item.amount);
          }
  
          const amount = Number(item.amount)
            .toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            });
  
          const date = Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit'
          }).format(new Date(item.date));
  
          return {
            id: item.id,
            name: item.name,
            amount,
            type: item.type,
            category: item.category,
            date
          }
      });
      
      setData(transactionsFormatted);

      const lastTransactionEntry = getLastTransactionDate(transactions, 'up');
      const lastTransactionExpensive = getLastTransactionDate(transactions, 'down');
      const totalInterval = `1 a ${lastTransactionEntry}`;

      setIsLoading(false);
      
      const total = entriesSum - expensiveSum;
      
      setHighlightData({
        expensive: {
          amount: expensiveSum.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }),
          lastTransaction: `Última saída dia ${lastTransactionEntry}`
        },
        entries: {
          amount: entriesSum.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }),
          lastTransaction: `Última entrada dia ${lastTransactionEntry}`
        },
        total: {
          amount: total.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }),
          lastTransaction: totalInterval
        }
      })
    } catch(error) {
      console.log(error);
      Alert.alert('Erro ao buscar dados');
    }

  }

  useEffect(() => {
    loadTransactions();

    
  }, [])

  useFocusEffect(useCallback(() => {
    loadTransactions();
  }, []));

  return (
    <Container>
      {
        isLoading ? <LoadContainer><ActivityIndicator color={theme.colors.primary} size='large' /></LoadContainer> :
        <>
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
            <HighlightCard type='up' title='Entradas' amount={highlightData.entries.amount} lastTransaction={highlightData.entries.lastTransaction} /> 
            <HighlightCard type='down' title='Saídas' amount={highlightData.expensive.amount} lastTransaction={highlightData.expensive.lastTransaction} /> 
            <HighlightCard type='total' title='Total' amount={highlightData.total.amount} lastTransaction={highlightData.total.lastTransaction} /> 
          </HighlightCards>

          <Transactions>
            <Title>Listagem</Title>

            <TransactionList 
              data={data}
              keyExtractor={ item => item.id }
              renderItem={({ item }) => <TransactionCard data={item} />}
            />

          </Transactions>
        </> 
      }
    </Container>
  );
}
