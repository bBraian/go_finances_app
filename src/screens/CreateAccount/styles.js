import styled from "styled-components/native";
import { RFValue } from 'react-native-responsive-fontsize';
import {StatusBar} from 'react-native';

export const Container = styled.View`
    flex: 1;
    background-color: ${props => props.theme.colors.primary};
    justify-content: space-between;
    padding: 28px 24px 36px 24px;
`;

export const StatusBarFake = styled.View`
    height: ${StatusBar.currentHeight}px;
    background-color: ${props => props.theme.colors.primary};
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99;
`;

export const Content = styled.View`
    flex: 1;
    margin-bottom: 68px;
    z-index: 2;
    background-color: ${props => props.theme.colors.primary};
`;

export const Title = styled.Text`
    font-family: ${props => props.theme.fonts.medium};
    color: ${props => props.theme.colors.shape};
    text-align: center;
    color: #ffffff;
    margin-top: 30px;
    font-size: ${RFValue(27)}px;
`;

export const Form = styled.View`
    justify-content: center;
    margin-bottom: 115px;
    flex: 1;
    background-color: ${props => props.theme.colors.primary};
    z-index: 2;
`;

export const Box = styled.View`
    margin-top: 32px;
    background-color: ${props => props.theme.colors.primary};
    z-index: 2;
`;

export const InputDescription = styled.Text`
    font-family: ${props => props.theme.fonts.regular};
    font-size: ${RFValue(14)}px;
    color: #FFFFFF;
    margin-bottom: 7px;
`;

export const ErrorMessage = styled.Text`
    font-family: ${props => props.theme.fonts.medium};
    font-size: ${RFValue(14)}px;
    color: red;
    margin-top: 5px;
`;

export const AvatarList = styled.ScrollView.attrs({
    horizontal: true,
    showsHorizontalScrollIndicator: false
})`

`;

export const NameInput = styled.TextInput`
    flex-direction: row;
    align-items: center;

    background-color: ${props => props.theme.colors.shape};
    border: 1px #303030;
    padding: 0 20px;
    border-radius: 4px;
    height: ${RFValue(56)}px;
    width: 100%;

    color: #888D97;
    font-size: ${(RFValue(15))}px;
`;

export const ButtonSelectAvatar = styled.TouchableOpacity`
    height: ${RFValue(120)}px;
    width: ${RFValue(120)}px;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    margin-right: 18px;
    overflow: hidden;
    opacity: ${props => props.selected ? 1 : 0.8};
    border-width: ${props => props.selected ? 4 : 0}px;
    border-color: ${props => props.selected ? props.theme.colors.secundary : props.theme.colors.primary};
`;

export const AvatarImage = styled.Image`
    height: ${RFValue(120)}px;
    width: ${RFValue(120)}px;
    border-radius: 4px;
`;

export const ButtonCreateUser = styled.TouchableOpacity`
    height: ${RFValue(56)}px;
    width: 100%;
    background-color: ${props => props.theme.colors.secundary};
    font-family: ${props => props.theme.fonts.medium};
    border-radius: 5px;

    align-items: center;
    flex-direction: row;
    margin-bottom: 16px;
    position: absolute;
    bottom: 32px;
    left: 24px;
    right: 24px;
    z-index: 2;
`;

export const TextCreateUser = styled.Text`
    flex: 1;
    text-align: center;

    font-family: ${props => props.theme.fonts.medium};
    font-size: ${RFValue(14)}px;
    color: ${props => props.theme.colors.shape};
`;