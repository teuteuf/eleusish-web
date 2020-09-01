import { Player } from '../domain/players/player'
import { nanoid } from 'nanoid'
import playerRepository from '../repositories/players.repository'
import L from '../../common/logger'

const service = {
  create: async (pseudo: string): Promise<Player> => {
    L.info(`create player with pseudo ${pseudo}`)

    const player: Player = {
      id: nanoid(12),
      pseudo,
    }

    await playerRepository.insert(player)

    return player
  },
}

export default service
