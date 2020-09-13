import L from '../../common/logger'
import ruleRepository from '../repositories/rules.repository'
import playerRepository from '../repositories/players.repository'
import { Rule } from '../domain/rules/rule'
import shortid from 'shortid'
import { nanoid } from 'nanoid'

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

  async create(authorId: string, code: string): Promise<Rule> {
    L.info(`create rule with code ${code}`)

    const player = await playerRepository.findById(authorId)
    if (player == null) {
      throw new Error('Wrong author id.')
    }

    const rule: Rule = {
      id: nanoid(12),
      code,
      author: player,
      validated: false,
    }

    await ruleRepository.insert(rule)
    return rule
  }

  async validate(ruleId: string, validated: boolean): Promise<Rule> {
    L.info(`validate rule ${ruleId}: ${validated}`)

    const rule = await ruleRepository.findById(ruleId)
    if (rule == null) {
      throw new Error('Rule not found.')
    }

    const updatedRule = { ...rule, validated }
    ruleRepository.update(updatedRule)

    return rule
  }
}

export default new RulesService()
