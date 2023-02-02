import styled, { css } from "styled-components/native";
import { Feather } from '@expo/vector-icons'
import { TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

interface IconProps {
    type: 'up' | 'down';
}

interface ButtonProps {
    isActive: boolean;
    type: 'up' | 'down';
}

export const Container = styled(TouchableOpacity)<ButtonProps>`
    width: 48%;

    flex-direction: row;
    align-items: center;
    justify-content: center;

    background-color: ${props => !props.isActive && props.theme.colors.shape };
    border-radius: 5px;

    padding: 16px;

    ${props => props.isActive && props.type === 'down' && css`
        background-color: ${props => props.theme.colors.attention_light};
    `};

    ${props => props.isActive && props.type === 'up' && css`
        background-color: ${props => props.theme.colors.success_light};
    `};
`;

export const Icon = styled(Feather)<IconProps>`
    font-size: ${RFValue(24)}px;
    margin-right: 12px;
    color: ${props => props.type === 'up' ? props.theme.colors.success : props.theme.colors.attention};
`;

export const Title = styled.Text`
    font-family: ${props => props.theme.fonts.regular};
    font-size: ${RFValue(14)}px;
`;