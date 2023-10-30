import AsyncStorage from '@react-native-async-storage/async-storage';
import { GROUP_COLLECTION } from '../storageConfig';
import { findGroups } from './findGroups';
import { AppError } from '@utils/AppError';

export async function groupCreate(newGroup: string): Promise<void> {
  try {
    const storedGroups = await findGroups();

    // const groupAlreadyExists = storedGroups.filter((item) => item === newGroup);
    const groupAlreadyExists = storedGroups.includes(newGroup.trim());

    if (groupAlreadyExists) {
      // grupo ja existe
      throw new AppError('Já existe um grupo cadastrado com esse nome');
    } else {
      const newStoredGroups = JSON.stringify([
        ...storedGroups,
        newGroup.trim(),
      ]);

      await AsyncStorage.setItem(GROUP_COLLECTION, newStoredGroups);
    }
  } catch (error) {
    throw error;
  }
}
