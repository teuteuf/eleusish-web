import L from '../../common/logger'
import ruleRepository from '../repositories/rules.repository'
import { Rule } from '../domain/rules/rule'
import shortid from 'shortid'

export class RulesService {
  async all(): Promise<Rule[]> {
    const rules = await ruleRepository.findAll()
    L.info(rules, 'fetch all rules')
    return rules
  }

  async byId(id: string): Promise<Rule> {
    L.info(`fetch rule with id ${id}`)
    return ruleRepository.findById(id)
  }

  async create(code: string): Promise<Rule> {
    L.info(`create rule with code ${code}`)
    const rule: Rule = {
      id: shortid(),
      code: code,
    }
    await ruleRepository.insert(rule)
    return rule
  }
}

export default new RulesService()
