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
      relations: ['author', 'ruleName'],
      where,
      order: {
        index: 'ASC',
      },
    })
    return rulesDb.map((ruleDb) => ({
      id: ruleDb.id,
      code: ruleDb.code,
      validated: ruleDb.validated,
      shortDescription: ruleDb.shortDescription,
      author: {
        pseudo: ruleDb.author.pseudo,
      },
      ruleName: {
        godName: ruleDb.ruleName.godName,
        number: ruleDb.ruleName.number,
      },
    }))
  },
  findByIdWithRelations: async (id) => {
    const repository = getRepository(Rule)
    const ruleDb = await repository.findOne(
      { id },
      { relations: ['author', 'ruleName'] }
    )

    if (ruleDb != null) {
      return {
        id: ruleDb.id,
        code: ruleDb.code,
        validated: ruleDb.validated,
        shortDescription: ruleDb.shortDescription,
        author: {
          id: ruleDb.author.id,
          pseudo: ruleDb.author.pseudo,
        },
        ruleName: {
          id: ruleDb.ruleName.id,
          godName: ruleDb.ruleName.godName,
          number: ruleDb.ruleName.number,
        },
      }
    }
  },
  findById: async (id) => {
    const repository = getRepository(Rule)
    const ruleDb = await repository.findOne({ id })
    return ruleDb && dbRuleToRule(ruleDb)
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
      { relations: ['author'], order: { index: 'ASC' } }
    )

    if (ruleDb != null) {
      return dbRuleToRule(ruleDb)
    }
  },
  insert: async (rule, author, ruleName) => {
    const repository = getRepository(Rule)
    await repository.insert({
      ...rule,
      author,
      ruleName,
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
    shortDescription: ruleDb.shortDescription,
  }
}

export default ruleRepositoryDb
