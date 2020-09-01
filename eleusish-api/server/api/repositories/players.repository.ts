import PlayerRepository from '../domain/players/repository'
import { getRepository } from 'typeorm'
import { Player } from '../../db/entity/Player'

const playerRepositoryDb: PlayerRepository = {
  findAll: async () => {
    const repository = getRepository(Player)
    const playersDb = await repository.find()
    return playersDb.map((playerDb) => ({
      id: playerDb.id,
      pseudo: playerDb.pseudo,
    }))
  },
  findById: async (id) => {
    const repository = getRepository(Player)
    const playerDb = await repository.findOne({ id })

    if (playerDb != null) {
      return {
        id: playerDb.id,
        pseudo: playerDb.pseudo,
      }
    }
  },
  insert: async (player) => {
    const repository = getRepository(Player)
    repository.insert(player)
  },
}

export default playerRepositoryDb
