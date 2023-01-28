import styled  from "styled-components/native";
import { Feather } from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.TouchableOpacity.attrs({
    activeOpacity: 0.7
})`
    background-color: ${props => props.theme.colors.shape};
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: 5px;
    padding: 18px 16px;
`;

export const Box = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const Title = styled.Text`
    font-family: ${props => props.theme.fonts.regular};
    line-height: ${RFValue(18)}px;
    font-size: ${RFValue(14)}px;
    margin-left: 8px;
`;

export const CategoryIcon = styled(Feather)`
    font-size: ${RFValue(16)}px;
`;

export const Icon = styled(Feather)`
    font-size: ${RFValue(20)}px;
    color: ${props => props.theme.colors.text};
`;