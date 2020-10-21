import { generateGodName, RuleName } from '../domain/ruleNames/ruleName'
import { nanoid } from 'nanoid'
import ruleNameRepository from '../repositories/ruleNames.repositor'

const service = {
  generate: async (): Promise<RuleName> => {
    const godName = generateGodName()
    const ruleName: RuleName = {
      id: nanoid(12),
      godName,
      number: (await ruleNameRepository.countByGodName(godName)) + 1,
    }

    await ruleNameRepository.insert(ruleName)

    return ruleName
  },
}

export default service
