import { Rule, RuleWithAuthorAndName } from './rule'
import { Player } from '../players/player'
import { RuleName } from '../ruleNames/ruleName'

interface RuleRepository {
  findAll: (filters: {
    authorId?: string
    validated?: boolean
  }) => Promise<RuleWithAuthorAndName[]>
  findById: (id: string) => Promise<Rule | undefined>
  findNotValidatedRule: (authorId: string) => Promise<Rule | undefined>
  insert: (rule: Rule, author: Player, ruleName: RuleName) => Promise<void>
  update: (rule: Rule) => Promise<void>
}

export default RuleRepository
