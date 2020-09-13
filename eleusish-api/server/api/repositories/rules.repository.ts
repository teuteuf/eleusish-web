import { getRepository } from 'typeorm'
import { Rule } from '../../db/entity/Rule'
import RuleRepository from '../domain/rules/repository'

const ruleRepositoryDb: RuleRepository = {
  findAll: async () => {
    const repository = getRepository(Rule)
    const rulesDb = await repository.find({ relations: ['author'] })
    return rulesDb.map((ruleDb) => ({
      id: ruleDb.id,
      code: ruleDb.code,
      author: {
        id: ruleDb.author.id,
        pseudo: ruleDb.author.pseudo,
      },
      validated: ruleDb.validated,
    }))
  },
  findById: async (id) => {
    const repository = getRepository(Rule)
    const ruleDb = await repository.findOne({ id }, { relations: ['author'] })

    if (ruleDb != null) {
      return {
        id: ruleDb.id,
        code: ruleDb.code,
        author: {
          id: ruleDb.author.id,
          pseudo: ruleDb.author.pseudo,
        },
        validated: ruleDb.validated,
      }
    }
  },
  insert: async (rule) => {
    const repository = getRepository(Rule)
    repository.insert(rule)
  },
  update: async (rule) => {
    const repository = getRepository(Rule)
    const ruleToUpdate = await repository.findOne({ id: rule.id })
    await repository.save({
      ...ruleToUpdate,
      ...rule,
    })
  },
}

export default ruleRepositoryDb
