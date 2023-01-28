import React, { useState } from 'react';
import { Modal } from 'react-native';

import { CategorySelect } from '../CategorySelect';
import { Button } from '../../components/Form/Button';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import { Input } from '../../components/Form/Input';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';

import {
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionsTypes
} from './styles';

export function Register() {
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
        icon: ''
    });
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
    return (
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>

            <Form>
                <Fields>
                    <Input 
                        placeholder='Nome'
                    />
                    <Input 
                        placeholder='Preço'
                    />

                    <TransactionsTypes>
                        <TransactionTypeButton
                            isActive={transactionType === 'down'}
                            type='down' 
                            title='income'
                            onPress={() => handleTransactionTypeSelect('down')}
                        />
                        <TransactionTypeButton
                            isActive={transactionType === 'up'}
                            type='up' 
                            title='outcome'
                            onPress={() => handleTransactionTypeSelect('up')} 
                        />
                    </TransactionsTypes>

                    <CategorySelectButton 
                        title={category.name}
                        icon={category.icon}
                        onPress={handleOpenSelectCategoryModal}
                    />

                </Fields>


                <Button title='Enviar' />
            </Form>

            <Modal visible={categoryModalOpen}>
             <CategorySelect 
                category={category}
                setCategory={setCategory}
                closeSelectCategory={handleCloseSelectCategoryModal}
             />
            </Modal>

        </Container>
  );
}