import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.TouchableOpacity`
    width: 100%;
    background-color: ${props => props.theme.colors.secundary};
    border-radius: 5px;
    justify-content: center;
    align-items: center;
`;

export const Title = styled.Text`
    font-size: ${RFValue(14)}px;
    font-family: ${props => props.theme.fonts.medium};
    color: ${props => props.theme.colors.shape};
    padding: 18px;
`;