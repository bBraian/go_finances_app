import styled from "styled-components/native";
import { TextInput } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled(TextInput)`
    width: 100%;
    padding: 16px 18px;
    font-size: ${RFValue(14)}px;
    background-color: ${props => props.theme.colors.shape};
    color: ${props => props.theme.colors.text_dark};
    font-family: ${props => props.theme.fonts.regular};
    border-radius: 5px;
    margin-bottom: 8px;
`;