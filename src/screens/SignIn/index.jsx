import React from 'react';
import { 
    Container,
    Header,
    TitleWrapper,
    Title,
    SignInTitle,
    Footer,
    RegisterButton,
    TextRegister,
} from './styles';

import LogoSvg from '../../../assets/logo.svg';
import { RFValue } from 'react-native-responsive-fontsize';

export function SignIn() {
    return (
        <Container>
            <Header>
                <TitleWrapper>
                    <LogoSvg 
                        width={RFValue(120)}
                        height={RFValue(80)}
                    />

                    <Title>
                        Controle suas{'\n'}
                        finanças de forma{'\n'}
                        muito simples
                    </Title>
                </TitleWrapper>

                <SignInTitle>
                    Crie sua conta e{'\n'}
                    controle suas finanças
                </SignInTitle>
            </Header>

            <Footer>
                <RegisterButton>
                    <TextRegister>Criar conta</TextRegister>
                </RegisterButton>
            </Footer>

        </Container>
    )
}