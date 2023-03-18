import { useState } from "react";
import { avatares } from "../../data/avatares";
import { AvatarImage, AvatarList, Box, ButtonCreateUser, ButtonSelectAvatar, Container, Content, ErrorMessage, Form, InputDescription, NameInput, StatusBarFake, TextCreateUser, Title } from "./styles";
import { Alert } from "react-native";
import { useAuth } from "../../hooks/auth";
import uuid from 'react-native-uuid';

export function CreateAccount() {
    const [avatarSelected, setAvatarSelected] = useState(0);
    const [avatarError, setAvatarError] = useState("");
    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const { createUser, setUser } = useAuth()

    function handleCreateUser() {
        resetErrors();
        let error = validations();
        if(!error) {
            const userData = {
                id: String(uuid.v4()),
                avatarId: avatarSelected, 
                username: username,
            }
            try {
                createUser(userData);
                setUser(userData);
            } catch(error) {
                Alert.alert('Erro ao criar usuário!')
            }
        }
    }

    function validations() {
        let error = false;
        if(avatarSelected === 0) {
            error = true;
            setAvatarError("Selecione um avatar");
        }
        if(username.length > 14) {
            error = true;
            setUsernameError("Usuário não pode ter mais de 14 caracteres");
        }
        if(username.length < 3) {
            error = true;
            setUsernameError("Usuário não pode ter menos de 3 caracteres");
        }
        if(Number.isInteger(parseInt(username))) {
            error = true;
            setUsernameError("Usuário não pode ser numérico");
        }
        if(username == "") {
            error = true;
            setUsernameError("Preencha o nome de usuário");
        }

        return error;
    }

    function resetErrors() {
        setAvatarError("");
        setUsernameError("");
    }

    return (
        <Container>
            <StatusBarFake></StatusBarFake>
            <Content>
                <Title>Vamos criar seu usuário!</Title>

                <Form>
                    <Box>
                        <InputDescription>Selecione um avatar</InputDescription>
                        <AvatarList>
                            {avatares.map(avatar => (
                                <ButtonSelectAvatar
                                    onPress={() => setAvatarSelected(avatar.id)}
                                    selected={avatar.id === avatarSelected} 
                                    key={avatar.id}
                                >
                                    <AvatarImage source={avatar.image} />
                                </ButtonSelectAvatar>
                            ))}
                        </AvatarList>
                        { avatarError !== "" && <ErrorMessage>{avatarError}</ErrorMessage> }
                    </Box>
                    <Box>
                        <InputDescription>Seu nome de usuário</InputDescription>
                        <NameInput onChangeText={setUsername} />
                        { usernameError !== "" && <ErrorMessage>{usernameError}</ErrorMessage> }
                    </Box>
                </Form>

            </Content>
            <ButtonCreateUser onPress={handleCreateUser}>
                <TextCreateUser>Criar usuário</TextCreateUser>
            </ButtonCreateUser>
        </Container>
    )
}