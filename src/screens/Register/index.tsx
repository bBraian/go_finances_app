import React, { useState } from 'react';
import { Keyboard, Modal, TouchableWithoutFeedback, Alert } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid';

import { useNavigation } from '@react-navigation/native';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useForm, Control, FieldValues } from 'react-hook-form';

import { CategorySelect } from '../CategorySelect';
import { Button } from '../../components/Form/Button';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';

import {
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionsTypes
} from './styles';
import { InputForm } from '../../components/InputForm';
import { useAuth } from '../../hooks/auth';

interface FormData {
    name: string;
    amount: string;
}

const schema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório').typeError('O nome não pode ser numérico'),
    amount: Yup.number().typeError('Informe um valor numérico').positive('O valor não pode ser negativo').required('O valor é obrigatório')
})

type NavigationProps = {
    navigate:(screen:string) => void;
 }


export function Register() {
    const { user } = useAuth();
    
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
        icon: ''
    });

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<FormData>({
        resolver: yupResolver(schema)
    });

    const navigation = useNavigation<NavigationProps>();
    const formControll = control as unknown as Control<FieldValues, any>

    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const [transactionType, setTransactionType] = useState('');

    function handleTransactionTypeSelect(type: 'up' | 'down') {
        setTransactionType(type);
    }  

    function handleCloseSelectCategoryModal() {
        setCategoryModalOpen(false)
    }

    function handleOpenSelectCategoryModal() {
        setCategoryModalOpen(true);
    }

    async function handleRegister(form: FormData) {
        if(!transactionType) 
            return Alert.alert('Selecione o tipo da transação!');
        

        if(category.key === 'category')
            return Alert.alert('Selecione a categoria!');

        
        const data = {
            id: String(uuid.v4()),
            name: form.name,
            amount: form.amount,
            type: transactionType,
            category: category.key,
            date: new Date()
        }

        try {
            const dataKey = `@gofinances:transactions_user:${user.id}`;
            const storageData = await AsyncStorage.getItem(dataKey);
            const currentData = storageData ? JSON.parse(storageData) : [];

            const dataFormatted = [ ...currentData, data ];

            await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted))

            reset();
            setTransactionType('');
            setCategory({        
                key: 'category',
                name: 'Categoria',
                icon: ''
            })
            navigation.navigate('Listagem');
           

        } catch (error) {
            console.log(error);
            Alert.alert("Não foi possível salvar");
        }
        console.log(data);
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <Header>
                    <Title>Cadastro</Title>
                </Header>

                <Form>
                    <Fields>
                        <InputForm 
                            name="name"
                            control={formControll}
                            placeholder="Nome"
                            autoCapitalize="sentences"
                            autoCorrect={false}
                            error={errors.name && errors.name.message}
                        />
                        <InputForm
                            name="amount"
                            control={formControll}
                            placeholder="Valor"
                            keyboardType="numeric"
                            error={errors.amount && errors.amount.message}
                        />

                        <TransactionsTypes>
                            <TransactionTypeButton
                                isActive={transactionType === 'up'}
                                type='up' 
                                title='income'
                                onPress={() => handleTransactionTypeSelect('up')}
                            />
                            <TransactionTypeButton
                                isActive={transactionType === 'down'}
                                type='down' 
                                title='outcome'
                                onPress={() => handleTransactionTypeSelect('down')} 
                            />
                        </TransactionsTypes>

                        <CategorySelectButton 
                            title={category.name}
                            icon={category.icon}
                            onPress={handleOpenSelectCategoryModal}
                        />

                    </Fields>


                    <Button 
                        title="Enviar"
                        onPress={handleSubmit(handleRegister)}
                    />
                </Form>

                <Modal visible={categoryModalOpen}>
                <CategorySelect 
                    category={category}
                    setCategory={setCategory}
                    closeSelectCategory={handleCloseSelectCategoryModal}
                />
                </Modal>
            </Container>
        </TouchableWithoutFeedback>
  );
}