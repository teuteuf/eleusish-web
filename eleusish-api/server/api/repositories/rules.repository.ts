import { getRepository } from 'typeorm'
import { Rule } from '../../db/entity/Rule'
import RuleRepository from '../domain/rules/repository'

const ruleRepositoryDb: RuleRepository = {
  findAll: async ({
    authorId,
    validated,
  }: {
    authorId?: string
    validated?: boolean
  }) => {
    const where = {}
    if (authorId != null) {
      where['author'] = { id: authorId }
    }
    if (validated != null) {
      where['validated'] = validated
    }
    const repository = getRepository(Rule)
    const rulesDb = await repository.find({
      relations: ['author'],
      where,
    })
    return rulesDb.map(dbRuleToRule)
  },
  findById: async (id) => {
    const repository = getRepository(Rule)
    const ruleDb = await repository.findOne({ id }, { relations: ['author'] })

    if (ruleDb != null) {
      return dbRuleToRule(ruleDb)
    }
  },
  findNotValidatedRule: async (authorId) => {
    const repository = getRepository(Rule)
    const ruleDb = await repository.findOne(
      {
        validated: false,
        author: {
          id: authorId,
        },
      },
      { relations: ['author'] }
    )

    if (ruleDb != null) {
      return dbRuleToRule(ruleDb)
    }
  },
  insert: async (rule, author) => {
    const repository = getRepository(Rule)
    await repository.insert({
      ...rule,
      author,
    })
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

function dbRuleToRule(ruleDb: Rule) {
  return {
    id: ruleDb.id,
    code: ruleDb.code,
    validated: ruleDb.validated,
  }
}

export default ruleRepositoryDb
