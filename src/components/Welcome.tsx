import React from 'react';
import { View, Text } from 'react-native';

interface Props {
    title: string;
}

export function Welcome({title}: Props) {
  return (
    <View>
        <Text>{title} App configurado com sucesso!</Text>
    </View>
  );
}