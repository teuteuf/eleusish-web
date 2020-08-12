import { getRepository } from 'typeorm'
import { Rule } from '../../entity/Rule'
import RuleRepository from '../domain/rules/repository'

const ruleRepositoryDb: RuleRepository = {
  findAll: async () => {
    const repository = getRepository(Rule)
    const rulesDb = await repository.find()
    return rulesDb.map((ruleDb) => ({
      id: ruleDb.id,
      code: ruleDb.code,
    }))
  },
  findById: async (id) => {
    const repository = getRepository(Rule)
    const rulesDb = await repository.findOne({ id })
    return {
      id: rulesDb.id,
      code: rulesDb.code,
    }
  },
  insert: async (rule) => {
    const repository = getRepository(Rule)
    repository.insert(rule)
  },
}

export default ruleRepositoryDb
