import styled from "styled-components/native";
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
    background-color: ${props => props.theme.colors.shape};
    border-radius: 5px;
    padding: 17px 24px;
    margin-bottom: 16px;
`;

export const Title = styled.Text`
    font-size: ${RFValue(14)}px;
    font-family: ${props => props.theme.fonts.regular};
`;

export const Amount = styled.Text`
    font-size: ${RFValue(20)}px;
    margin-top: 2px;
    font-family: ${props => props.theme.fonts.regular};
    color: ${props => props.type === 'up' ? props.theme.colors.success : props.theme.colors.attention};
`;

export const Footer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 19px;
`;

export const Category = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const Icon = styled(Feather)`
    font-size: ${RFValue(20)}px;
    color: ${props => props.theme.colors.text};
`;

export const CategoryName = styled.Text`
    font-size: ${RFValue(14)}px;
    color: ${props => props.theme.colors.text};
    margin-left: 8px;
`;

export const Date = styled.Text`
    font-size: ${RFValue(14)}px;
    color: ${props => props.theme.colors.text};
`;
