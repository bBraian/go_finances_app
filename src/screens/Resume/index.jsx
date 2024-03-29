import React, { useCallback, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VictoryPie } from 'victory-native';
import { useTheme } from 'styled-components';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { HistoryCard } from '../../components/HistoryCard';
import { 
    Container, 
    Header, 
    Title, 
    Content, 
    ChartContainer,
    MonthSelect,
    ChangeMonthButton,
    SelectIcon,
    Month,
    LoadContainer,

} from './styles';
import { categories } from '../../data/categories';
import { RFValue } from 'react-native-responsive-fontsize';
import { ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';

export function Resume() {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [totalByCategories, setTotalByCategories] = useState([]);
    const { user } = useAuth();
    const theme = useTheme();

    function handleChangeData(action) {
        if(action === 'next') {
            setSelectedDate(addMonths(selectedDate, 1));
        } else {
            setSelectedDate(subMonths(selectedDate, 1));
        }
    }

    async function loadData() {
        setIsLoading(true);
        try {
            const dataKey = `@gofinances:transactions_user:${user.id}`;
            const response = await AsyncStorage.getItem(dataKey);
            const responseFormatted = response ? JSON.parse(response) : [];
    
            const expensives = responseFormatted
                .filter((expensive) => 
                    expensive.type === 'down' &&
                    new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
                    new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
                );

            const expensivesTotal = expensives.reduce((acumullator, expensive) => {
                return acumullator + Number(expensive.amount);
            }, 0);
    
            const totalByCategory = [];
    
            categories.forEach(category => {
                let categorySum = 0;
    
                expensives.forEach((expensive) => {
                    if(expensive.category === category.key) {
                        categorySum += Number(expensive.amount);
                    } 
                });
    
                if(categorySum > 0) {
                    const totalFormatted = categorySum.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    })

                    const percent = `${(categorySum / expensivesTotal * 100).toFixed(0)}%`;
                    totalByCategory.push({
                        key: category.key,
                        name: category.name,
                        color: category.color,
                        total: categorySum,
                        totalFormatted,
                        percent
                    })
                }
              
            })

            setTotalByCategories(totalByCategory);
            setIsLoading(false);
        } catch(error) {
            console.log(error);
        }
        
    }

    useFocusEffect(useCallback(() => {
        loadData();
      }, [selectedDate]));

  return (
    <Container>
        <Header>
            <Title>Resumo por categoria</Title>
        </Header>
        {
            isLoading ? 
                <LoadContainer><ActivityIndicator color={theme.colors.primary} size='large' /></LoadContainer> 
            :
                <Content
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingHorizontal: 24,
                        paddingBottom: useBottomTabBarHeight()
                    }}
                >

                    <MonthSelect>
                        <ChangeMonthButton onPress={() => handleChangeData('prev')}>
                            <SelectIcon name="chevron-left" />
                        </ChangeMonthButton>

                        <Month>{format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}</Month>

                        <ChangeMonthButton onPress={() => handleChangeData('next')}>
                            <SelectIcon name="chevron-right" />
                        </ChangeMonthButton>
                    </MonthSelect>

                    <ChartContainer>
                        <VictoryPie 
                            data={totalByCategories}
                            colorScale={totalByCategories.map(category => category.color)}
                            style={{
                                labels: {
                                    fontSize: RFValue(18),
                                    fontWeight: 'bold',
                                    fill: theme.colors.shape
                                }
                            }}
                            labelRadius={70}
                            x="percent"
                            y="total"
                        />
                    </ChartContainer>

                    {
                        totalByCategories.map((item) => (
                            <HistoryCard 
                                title={item.name}
                                amount={item.totalFormatted}
                                color={item.color}
                                key={item.key}
                            />
                        ))
                    }
                    
                </Content>
            }
    </Container>
  );
}