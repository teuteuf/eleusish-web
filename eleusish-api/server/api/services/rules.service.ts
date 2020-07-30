import L from '../../common/logger'

let id = 0

interface Rule {
  id: number
  code: string
}

const rules: Rule[] = []

export class RulesService {
  async all(): Promise<Rule[]> {
    L.info(rules, 'fetch all rules')
    return rules
  }

  async byId(id: number): Promise<Rule> {
    L.info(`fetch rule with id ${id}`)
    const allRules = await this.all()
    return allRules[id]
  }

  async create(code: string): Promise<Rule> {
    L.info(`create rule with code ${code}`)
    const rule: Rule = {
      id: id++,
      code: code,
    }
    rules.push(rule)
    return rule
  }
}

export default new RulesService()
