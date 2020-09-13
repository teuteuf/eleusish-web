import { Player } from '../players/player'

interface Rule {
  id: string
  code: string
  author: Player
  validated: boolean
}

export { Rule }
