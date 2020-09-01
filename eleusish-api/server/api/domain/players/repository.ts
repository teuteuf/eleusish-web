import { Player } from './player'

interface PlayerRepository {
  findAll: () => Promise<Player[]>
  findById: (id: string) => Promise<Player | undefined>
  insert: (player: Player) => Promise<void>
}

export default PlayerRepository
