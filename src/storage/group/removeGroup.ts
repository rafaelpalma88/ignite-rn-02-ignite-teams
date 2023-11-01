import AsyncStorage from '@react-native-async-storage/async-storage';
import { findGroups } from './findGroups';
import { GROUP_COLLECTION, PLAYER_COLLECTION } from '@storage/storageConfig';
import { playersGetByGroup } from '@storage/player/playersGetByGroup';

export async function removeGroup(removedGroup: string): Promise<string[]> {
  try {
    const storedGroups = await findGroups();

    const newArrayGroups = storedGroups.filter(
      (group) => group !== removedGroup,
    );

    await AsyncStorage.setItem(
      GROUP_COLLECTION,
      JSON.stringify(newArrayGroups),
    );

    await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${removedGroup}`);

    return newArrayGroups;
  } catch (error) {
    throw error;
  }
}
