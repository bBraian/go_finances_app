import React from 'react';

import { 
  Container, 
  Header,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  UserWrapper
} from "./styles";

export function Dashboard() {
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/77290279?v=4'}} />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Braian</UserName>
            </User>
          </UserInfo>
        </UserWrapper>

      </Header>
    </Container>
  );
}
