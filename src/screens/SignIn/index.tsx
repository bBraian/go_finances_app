import React, { useState } from 'react';
import { 
    Container,
    Header,
    TitleWrapper,
    Title,
    SignInTitle,
    Footer,
    FooterWrapper,
} from './styles';

import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../../assets/logo.svg';
import AppleSvg from '../../assets/apple.svg';
import { RFValue } from 'react-native-responsive-fontsize';
import { SignInButton } from '../../components/SignInButton';
import { useAuth } from '../../hooks/auth';
import { ActivityIndicator, Alert } from 'react-native';
import { useTheme } from 'styled-components';

export function SignIn() {
    const [isLoading, setIsLoading] = useState(false);
    const { signInWithGoogle } = useAuth();
    const theme = useTheme();

    function handleSignInWithApple() {
        Alert.alert('Em desenvolvimento')
    }

    async function handleSignInWithGoogle() {
        try {
            setIsLoading(true);
            return await signInWithGoogle();
        } catch (error) {
            console.log(error);
            Alert.alert('Não foi possível conectar a conta Google');
            setIsLoading(false);
        }
        
    }
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
                    Faça seu login com{'\n'}
                    uma das contas abaixo
                </SignInTitle>
            </Header>

            <Footer>
                <FooterWrapper>
                    <SignInButton svg={GoogleSvg} title="Entrar com Google" onPress={handleSignInWithGoogle} />
                    <SignInButton svg={AppleSvg} title="Entrar com Apple"  onPress={handleSignInWithApple} />
                </FooterWrapper>
                { isLoading && 
                    <ActivityIndicator 
                        color={theme.colors.shape}
                        style={{ marginTop: 18 }}
                    /> 
                }
            </Footer>

        </Container>
    )
}