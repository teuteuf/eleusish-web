import L from '../../common/logger'
import ruleRepository from '../repositories/rules.repository'
import playerRepository from '../repositories/players.repository'
import { Rule } from '../domain/rules/rule'
import { nanoid } from 'nanoid'
import { UnknownPlayerError } from '../domain/players/errors'
import { RuleToValidateError } from '../domain/rules/errors'

export class RulesService {
  async all(filters: {
    authorId?: string
    validated?: boolean
  }): Promise<Rule[]> {
    const rules = await ruleRepository.findAll(filters)
    L.info(rules, 'fetch all rules')
    return rules
  }

  async byId(id: string): Promise<Rule> {
    L.info(`fetch rule with id ${id}`)
    return ruleRepository.findById(id)
  }

  async create(authorId: string, code: string): Promise<Rule> {
    L.info(`create rule with code ${code}`)

    const ruleToValidate = await ruleRepository.findNotValidatedRule(authorId)
    if (ruleToValidate != null) {
      throw new RuleToValidateError('Need to validate existing rule first')
    }

    const player = await playerRepository.findById(authorId)
    if (player == null) {
      throw new UnknownPlayerError('Wrong author id.')
    }

    const rule: Rule = {
      id: nanoid(12),
      code,
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
    await ruleRepository.update(updatedRule)

    return updatedRule
  }
}

export default new RulesService()
