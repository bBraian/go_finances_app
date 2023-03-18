import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
`;

export const Header = styled.View`
    width: 100%;
    height: 78%;

    background-color: ${props => props.theme.colors.primary};
    justify-content: flex-end;
    align-items: center;
`;

export const TitleWrapper = styled.View`
    align-items: center;
`;

export const Title = styled.Text`
    font-family: ${props => props.theme.fonts.medium};
    color: ${props => props.theme.colors.shape};
    font-size: ${RFValue(30)}px;
    text-align: center;
    margin-top: 45px;
`;

export const SignInTitle = styled.Text`
    font-family: ${props => props.theme.fonts.regular};
    color: ${props => props.theme.colors.shape};
    font-size: ${RFValue(16)}px;
    text-align: center;
    margin-top: 65px;
    margin-bottom: 67px;
`;

export const Footer = styled.View`
    width: 100%;
    height: 22%;
    padding: 0 32px;
    background-color: ${props => props.theme.colors.secundary};
    align-items: center;
`;

export const RegisterButton = styled.TouchableOpacity`
    height: ${RFValue(62)}px;
    width: ${RFValue(62)}px;
    background-color: ${props => props.theme.colors.shape};
    border-radius: 5px;

    align-items: center;
    flex-direction: row;
    margin-bottom: 16px;
    position: absolute;
    bottom: 32px;
    border-radius: 99px;
    align-items: center;
    justify-content: center;
`;