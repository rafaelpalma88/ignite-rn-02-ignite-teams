import AsyncStorage from '@react-native-async-storage/async-storage';
import { playersGetByGroup } from './playersGetByGroup';
import { PLAYER_COLLECTION } from '@storage/storageConfig';

export async function playerRemoveByGroup(
  playerName: string,
  group: string,
): Promise<void> {
  try {
    const storage = await playersGetByGroup(group);

    const newArray = storage.filter((item) => item.name !== playerName);

    await AsyncStorage.setItem(
      `${PLAYER_COLLECTION}-${group}`,
      JSON.stringify(newArray),
    );
  } catch (error) {
    throw error;
  }
}
