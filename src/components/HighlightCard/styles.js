import styled, { css } from "styled-components/native";
import { Feather } from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
    background-color: ${(props) => props.type === 'total' ? props.theme.colors.secundary : props.theme.colors.shape };

    width: ${RFValue(300)}px;
    border-radius: 5px;
    padding: 19px 23px;
    padding-bottom: ${RFValue(32)}px;

    margin-right: 16px;
`;

export const Header = styled.View`
    justify-content: space-between;
    flex-direction: row;
`;

export const Title = styled.Text`
    font-family: ${(props) => props.theme.fonts.regular};
    font-size: ${RFValue(14)}px;
    color: ${(props) => props.type === 'total' ? props.theme.colors.shape : props.theme.colors.text_dark };
`;

export const Icon = styled(Feather)`
    font-size: ${RFValue(40)}px;

    ${(props) => props.type === 'up' && css`
        color: ${(props) => props.theme.colors.success};
    `}
    ${(props) => props.type === 'down' && css`
        color: ${(props) => props.theme.colors.attention};
    `}
    ${(props) => props.type === 'total' && css`
        color: ${(props) => props.theme.colors.shape};
    `}
`;

export const Footer = styled.View`
`;

export const Amount = styled.Text`
    font-family: ${(props) => props.theme.fonts.medium};
    font-size: ${RFValue(32)}px;
    color: ${(props) => props.type === 'total' ? props.theme.colors.shape : props.theme.colors.text_dark };
    margin-top: 20px;
`; 

export const LastTransaction = styled.Text`
    font-family: ${(props) => props.theme.fonts.regular};
    font-size: ${RFValue(12)}px;
    color: ${(props) => props.type === 'total' ? props.theme.colors.shape : props.theme.colors.text };
`;