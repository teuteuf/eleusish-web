import { Player } from '../players/player'
import { RuleName } from '../ruleNames/ruleName'

interface Rule {
  id: string
  code: string
  validated: boolean
}

interface RuleWithRelations extends Rule {
  author: Player
  ruleName: RuleName
}

interface RuleWithAuthorAndName extends Rule {
  author: Pick<Player, 'pseudo'>
  ruleName: Pick<RuleName, 'godName' | 'number'>
}

export { Rule, RuleWithRelations, RuleWithAuthorAndName }
