import RuleNameRepository from '../domain/ruleNames/repository'
import { getRepository } from 'typeorm'
import { RuleName } from '../../db/entity/RuleName'

const ruleNameRepositoryDB: RuleNameRepository = {
  insert: async (ruleName) => {
    const repository = getRepository(RuleName)
    await repository.insert(ruleName)
  },
  countByGodName: async (godName) => {
    const repository = getRepository(RuleName)
    return await repository.count({
      where: {
        godName,
      },
    })
  },
}

export default ruleNameRepositoryDB
