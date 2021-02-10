export interface Rule {
  id: string
  code: string
  shortDescription: string
  validated: boolean

  author: {
    pseudo: string
  }

  ruleName: {
    godName: string
    number: number
  }
}

export function formatRuleName(rule: Rule): string {
  const {
    ruleName: { godName, number },
  } = rule

  return `Rule ${'I'.repeat(number)} of ${godName}`
}
