import { Rule } from './rule'
import { Player } from '../players/player'

interface RuleRepository {
  findAll: (filters: {
    authorId?: string
    validated?: boolean
  }) => Promise<Rule[]>
  findById: (id: string) => Promise<Rule | undefined>
  findNotValidatedRule: (authorId: string) => Promise<Rule | undefined>
  insert: (rule: Rule, author: Player) => Promise<void>
  update: (rule: Rule) => Promise<void>
}

export default RuleRepository
