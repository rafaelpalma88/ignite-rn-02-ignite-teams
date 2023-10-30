import React, { useState } from 'react'
import { Container, Content, Icon } from "./styles";


import { Header } from "@components/Header";
import { Button } from "@components/Button";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { useNavigation } from '@react-navigation/native'
import { groupCreate } from '@storage/group/groupCreate';
import { AppError } from '@utils/AppError';
import { Alert } from 'react-native';

export function NewGroup(): React.JSX.Element {

  const [group, setGroup] = useState<string>('')

  const navigation = useNavigation()

  async function handleNew(): Promise<void> {
    try {

      if (group.trim().length === 0) {
        Alert.alert('Novo Grupo', 'Informe algum texto'); return;
      }

      await groupCreate(group)
      navigation.navigate('players', { group })
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Novo Grupo', error.message)
      } else {
        Alert.alert('Novo Grupo', 'Não foi possível criar um novo grupo')
        console.error('error', error)
      }
      
    }
   
    
  }

  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />
        
        <Highlight 
          title="Nova turma"
          subtitle="crie a turma para adicionar as pessoas"
        />

        <Input
          placeholder="Nome da turma"
          value={group}
          onChangeText={text => { setGroup(text); }}
        />

        <Button 
          title="Criar"
          style={{ marginTop: 20 }}
          onPress={handleNew}
        />
      </Content>
    </Container>
  )
}