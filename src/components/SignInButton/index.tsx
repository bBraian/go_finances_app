import React from "react";
import { 
    Container,
    ImageContainer,
    Text,
} from "./styles";
import { SvgProps } from "react-native-svg";
import { TouchableOpacityProps } from "react-native";

interface Props extends TouchableOpacityProps {
    title: string;
    svg: React.FC<SvgProps>
}

export function SignInButton({ title, svg: Svg, ...rest}: Props) {
    return (
        <Container {...rest} activeOpacity={0.8}>
            <ImageContainer>
                <Svg />
            </ImageContainer>

            <Text>
                {title}
            </Text>

        </Container>
    )
}