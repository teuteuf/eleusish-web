import L from '../../common/logger'
import ruleRepository from '../repositories/rules.repository'
import playerRepository from '../repositories/players.repository'
import { Rule, RuleWithAuthorAndName } from '../domain/rules/rule'
import { nanoid } from 'nanoid'
import { UnknownPlayerError } from '../domain/players/errors'
import { RuleToValidateError } from '../domain/rules/errors'
import ruleNamesService from './ruleNames.service'

export class RulesService {
  async all(filters: {
    authorId?: string
    validated?: boolean
  }): Promise<RuleWithAuthorAndName[]> {
    const rules = await ruleRepository.findAll(filters)
    L.info(rules, 'fetch all rules')
    return rules
  }
  async byId(id: string): Promise<Rule> {
    L.info(`fetch rule with id ${id}`)
    return ruleRepository.findById(id)
  }

  async create(
    authorId: string,
    code: string,
    shortDescription: string
  ): Promise<Rule> {
    L.info(`create rule with code ${code} by author ${authorId}`)

    if (code.length > 2000) {
      throw new Error('Too many characters in rule! (Max: 2000)')
    }

    if (shortDescription.length > 1000) {
      throw new Error('Too many characters in short description! (Max: 1000)')
    }

    const ruleToValidate = await ruleRepository.findNotValidatedRule(authorId)
    if (ruleToValidate != null) {
      throw new RuleToValidateError('Need to validate existing rule first')
    }

    const author = await playerRepository.findById(authorId)
    if (author == null) {
      throw new UnknownPlayerError('Wrong author id.')
    }

    const rule: Rule = {
      id: nanoid(12),
      code,
      validated: false,
      shortDescription,
    }

    const ruleName = await ruleNamesService.generate()

    await ruleRepository.insert(rule, author, ruleName)

    return rule
  }

  async validate(
    ruleId: string,
    validated: boolean,
    playerId: string,
    apiKey: string
  ): Promise<Rule> {
    L.info(`validate rule ${ruleId}: ${validated}`)

    const rule = await ruleRepository.findByIdWithRelations(ruleId)
    if (rule == null) {
      throw new Error('Rule not found.')
    }

    if (rule.author.id !== playerId) {
      throw new Error('Not allowed to validate someone else rule.')
    }

    if (apiKey !== process.env.API_KEY) {
      throw new Error('Valid API key not provided')
    }

    const { id, code, shortDescription } = rule
    const updatedRule = { id, code, validated, shortDescription }
    await ruleRepository.update(updatedRule)

    return updatedRule
  }

  async updateCode(
    id: string,
    code: string,
    playerId: string,
    validated: boolean,
    shortDescription: string
  ): Promise<Rule> {
    L.info(`update code for rule ${id}`)

    if (code.length > 2000) {
      throw new Error('Too many characters in rule! (Max: 2000)')
    }

    if (shortDescription != null && shortDescription.length > 1000) {
      throw new Error('Too many characters in short description! (Max: 1000)')
    }

    const rule = await ruleRepository.findByIdWithRelations(id)

    if (rule == null) {
      throw new Error('Rule not found.')
    }

    if (rule.author.id !== playerId) {
      throw new Error('Not allowed to edit someone else rule.')
    }

    const updatedRule = {
      id: rule.id,
      code,
      validated,
      shortDescription: shortDescription ?? rule.shortDescription,
    }
    await ruleRepository.update(updatedRule)

    return updatedRule
  }
}

export default new RulesService()
