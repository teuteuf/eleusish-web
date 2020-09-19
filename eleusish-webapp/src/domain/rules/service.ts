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

  if (response.status !== 201) {
    throw new Error(await response.text())
  }

  const createdRule = await response.json()

  return {
    id: createdRule.id,
    code: createdRule.code,
  }
}

export async function getRuleToValidate(
  authorId: string
): Promise<Rule | undefined> {
  const response = await fetch(
    `${process.env.REACT_APP_API_BASE_URL}/rules?validated=false&authorId=${authorId}`,
    {
      method: 'GET',
    }
  )

  if (response.status !== 200) {
    throw new Error(await response.text())
  }

  const rulesToValidate = await response.json()

  return rulesToValidate.length > 0 ? rulesToValidate[0] : undefined
}
