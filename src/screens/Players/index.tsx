import React, { useEffect, useState, useRef } from 'react';
import { Alert, FlatList, Keyboard, type TextInput } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { Input } from "@components/Input";
import { PlayerCard } from '@components/PlayerCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';

import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";
import { AppError } from '@utils/AppError';
import { playerAddByGroup } from '@storage/player/playerAddByGroup';
import { playersGetByGroup } from '@storage/player/playersGetByGroup';
import { playersGetByGroupAndTeam } from '@storage/player/playersGetByGroupAndTeam';
import { type PlayerStorageDTO } from '@storage/player/PlayerStorageDTO';
import { playerRemoveByGroup } from '@storage/player/playerRemoveByGroup';
import { removeGroup } from '@storage/group/removeGroup';
import { Loading } from '@components/Loading';

interface RouteParams {
  group: string
}

export function Players(): React.JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [team, setTeam] = useState('Time A')
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])
  const [newPlayerName, setNewPlayerName] = useState('')

  const route = useRoute()

  const navigation = useNavigation()
   
  const { group } = route.params as RouteParams

  const newPlayerNameInputRef = useRef<TextInput>(null)

  async function handleAddPlayer(): Promise<void> {

    if (newPlayerName.trim().length === 0){
      Alert.alert('Nova pessoa', 'Informe o nome da pessoa para adicionar'); return; 
    }
    try {
      const newPlayer = {
        name: newPlayerName,
        team
      }
      await playerAddByGroup(newPlayer, group)
      newPlayerNameInputRef.current?.blur()
      Keyboard.dismiss()
      
      setNewPlayerName('')
    } catch(error) {
      if (error instanceof AppError) {
        Alert.alert("Nova Pessoa", error.message)
      } else {
        Alert.alert("Nova Pessoa", 'Não foi possível adicionar')
      }
    }

  }

  async function fetchPlayersByTeam(): Promise<void> {
    setIsLoading(true)
    try {
      
      const playersByTeam = await playersGetByGroupAndTeam(group, team)

      setPlayers(playersByTeam)
      setIsLoading(false)
     
    } catch(error) {
      if (error instanceof AppError) {
        Alert.alert("Nova Pessoa", error.message)
      } else {
        Alert.alert("Nova Pessoa", 'Não foi possível adicionar')
      } 
    } finally {
      setIsLoading(false)
    }
  }

  async function handlePlayerRemove(playerName: string): Promise<void> {
    
    try {
      await playerRemoveByGroup(playerName, group)
      await fetchPlayersByTeam()
    } catch(error) {
      console.log(error)
      Alert.alert("Remover pessoa", 'Não foi possível remover essa pessoa')
    }
  }

  async function groupRemove(): Promise<void> {
    try {
    await removeGroup(group)
    navigation.navigate('groups')
  } catch(error){
    console.log(error)
    Alert.alert("Remover time", 'Não foi possível remover esse time')
  }
  }

  async function handleRemoveGroup(): Promise<void> {
    Alert.alert("Remover grupo", 'Deseja remover esse grupo?', [
      {text: 'Não', style: 'cancel'},
      {text: 'Sim', onPress: async () => { await groupRemove(); }}
    ])
  }

  useEffect(() => {
    fetchPlayersByTeam()
  },[players])

  return (
    <Container>
      <Header showBackButton />

      <Highlight 
        title={group}
        subtitle="adicione a galera e separe os times"
      />

      <Form>
        <Input 
          inputRef={newPlayerNameInputRef}
          onChangeText={setNewPlayerName}
          placeholder="Nome da pessoa"
          autoCorrect={false}
          value={newPlayerName}
          onSubmitEditing={handleAddPlayer} 
          returnKeyType='done'
        />

        <ButtonIcon 
          icon="add" 
          onPress={handleAddPlayer}
        />
      </Form>

      <HeaderList>
        <FlatList 
          data={['Time A', 'Time B']}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <Filter 
              title={item}
              isActive={item === team}
              onPress={() => { setTeam(item); }}
            />
          )}
          horizontal
        />

        <NumberOfPlayers>
          {players.length}
        </NumberOfPlayers>
      </HeaderList>

      {isLoading ? <Loading /> : (
        <FlatList 
          data={players}
          keyExtractor={item => item.name}
          renderItem={({ item }) => (
            <PlayerCard 
              name={item.name} 
              onRemove={async () => { await handlePlayerRemove(item.name); }}
            />
          )}
          ListEmptyComponent={() => (
            <ListEmpty message="Não há pessoas nesse time" />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[{ paddingBottom: 100 }, players.length === 0 && { flex: 1 }]}
          />
        )}

      <Button 
      title="Remover Turma"
      type="SECONDARY"
      onPress={async () => { await handleRemoveGroup(group); }}
      />

      
    </Container>
  )
}