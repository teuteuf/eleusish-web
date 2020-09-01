import { Request, Response } from 'express'
import PlayersService from '../../services/players.service'

const controller = {
  create: async (req: Request, res: Response): Promise<void> => {
    const { pseudo } = req.body
    const player = await PlayersService.create(pseudo)
    res.status(201).send(player)
  },
}

export default controller
