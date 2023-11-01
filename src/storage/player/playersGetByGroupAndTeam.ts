import { type PlayerStorageDTO } from './PlayerStorageDTO';
import { playersGetByGroup } from './playersGetByGroup';

export async function playersGetByGroupAndTeam(
  group: string,
  team: string,
): Promise<PlayerStorageDTO[]> {
  try {
    const storage = await playersGetByGroup(group);

    const players = storage.filter((player) => player.team === team);

    // Simular um atraso de 20 segundos
    // await new Promise((resolve) => setTimeout(resolve, 20000));

    return players;
  } catch (error) {
    throw error;
  }
}
