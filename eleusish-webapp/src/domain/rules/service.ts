import { Rule } from './rule'

export async function createNewRule(
  authorId: string,
  code: string
): Promise<Rule> {
  const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/rules`, {
    method: 'POST',
    body: JSON.stringify({ authorId, code }),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const createdRule = await response.json()

  return {
    id: createdRule.id,
    code: createdRule.code,
  }
}
