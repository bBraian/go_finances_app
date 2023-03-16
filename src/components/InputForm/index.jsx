import React from 'react';
import { Container, Error } from './styles';
import { Input } from '../Form/Input';
import { TextInputProps } from 'react-native';
import { Control, Controller } from 'react-hook-form';

export function InputForm({ control, name, error, ...rest }) {
  return (
    <Container>
        <Controller
            control={control}
            render={({ field: { onChange, value }}) => (
                <Input
                    {...rest}
                    onChangeText={onChange}
                    value={value}
                />
            )}
            name={name}
        />
        { error && <Error>{ error }</Error>}
    </Container>
  );
}