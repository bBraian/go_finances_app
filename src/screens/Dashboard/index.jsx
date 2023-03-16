import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard } from '../../components/TransactionCard';
import "intl";
import "intl/locale-data/jsonp/pt-BR";
import { TouchableOpacity } from 'react-native';

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

import { useTheme } from 'styled-components';
import { useAuth } from '../../hooks/auth';

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [highlightData, setHighlightData] = useState({
    expensive: {amount: 'R$ 0,00', lastTransaction: ' '},
    entries: {amount: 'R$ 0,00', lastTransaction: ' '},
    total: {amount: 'R$ 0,00', lastTransaction: ' '},
  });
  const theme = useTheme();

  const { signOut, user } = useAuth();

  function getLastTransactionDate(collection, type) {
    const collectionFilttered = collection
    .filter(transaction => transaction.type === type);

    if(collectionFilttered.length === 0)
    return 0;

    const lastTransaction = new Date( Math.max.apply(Math, collectionFilttered
      .map(transaction => new Date(transaction.date).getTime())
    ))

    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', { month: 'long' })}`
  }

  async function loadTransactions() {
    const dataKey = `@gofinances:transactions_user:${user.id}`;

    let entriesSum = 0;
    let expensiveSum = 0;

    try {
      const response = await AsyncStorage.getItem(dataKey);
      const transactions = response ? JSON.parse(response) : [];
  
      const transactionsFormatted = transactions
        .map((item) => {
  
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
      const totalInterval = lastTransactionEntry === 0 ? 'Não há transações' : `1 a ${lastTransactionEntry}`;

      setIsLoading(false);
      
      const total = entriesSum - expensiveSum;
      
      setHighlightData({
        expensive: {
          amount: expensiveSum.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }),
          lastTransaction: lastTransactionExpensive === 0 ? 'Não há transações' : `Última saída dia ${lastTransactionExpensive}`
        },
        entries: {
          amount: entriesSum.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }),
          lastTransaction: lastTransactionEntry === 0 ? 'Não há transações' : `Última entrada dia ${lastTransactionEntry}`
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
                <Photo source={{ uri: user.photo }} />
                <User>
                  <UserGreeting>Olá,</UserGreeting>
                  <UserName>{user.name}</UserName>
                </User>
              </UserInfo>
              <TouchableOpacity onPress={signOut}>
                <Icon name="power" />
              </TouchableOpacity>
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
