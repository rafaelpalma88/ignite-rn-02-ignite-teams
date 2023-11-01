import AsyncStorage from '@react-native-async-storage/async-storage';
import { GROUP_COLLECTION } from '../storageConfig';

export async function findGroups(): Promise<string[]> {
  try {
    const storage = await AsyncStorage.getItem(GROUP_COLLECTION);

    const groups: string[] = storage ? JSON.parse(storage) : [];

    // Simular um atraso de 20 segundos
    // await new Promise((resolve) => setTimeout(resolve, 20000));

    return groups;
  } catch (error) {
    throw error;
  }
}
