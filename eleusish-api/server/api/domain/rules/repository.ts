import { Rule } from './rule'

interface RuleRepository {
  findAll: (filters: {
    authorId?: string
    validated?: boolean
  }) => Promise<Rule[]>
  findById: (id: string) => Promise<Rule | undefined>
  findNotValidatedRule: (authorId: string) => Promise<Rule | undefined>
  insert: (rule: Rule) => Promise<void>
  update: (rule: Rule) => Promise<void>
}

export default RuleRepository
