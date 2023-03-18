import React from 'react';
import { 
    Container,
    Header,
    TitleWrapper,
    Title,
    SignInTitle,
    Footer,
    RegisterButton,
} from './styles';
import { AntDesign } from '@expo/vector-icons';

import LogoSvg from '../../../assets/logo.svg';
import { RFValue } from 'react-native-responsive-fontsize';

export function SignIn({navigation}) {
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
                <RegisterButton onPress={() => navigation.navigate('CreateAccount')}>
                    <AntDesign name="arrowright" size={38} color="#aaaaaa" />
                </RegisterButton>
            </Footer>

        </Container>
    )
}