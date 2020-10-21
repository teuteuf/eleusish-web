import { RuleName } from './ruleName'

interface RuleNameRepository {
  insert: (ruleName: RuleName) => Promise<void>
  countByGodName: (godName: string) => Promise<number>
}

export default RuleNameRepository
