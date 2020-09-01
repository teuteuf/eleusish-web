import { Rule } from './rule'

interface RuleRepository {
  findAll: () => Promise<Rule[]>
  findById: (id: string) => Promise<Rule | undefined>
  insert: (rule: Rule) => Promise<void>
}

export default RuleRepository
