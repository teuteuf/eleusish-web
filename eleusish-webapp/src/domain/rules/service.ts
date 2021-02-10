import { Rule } from './rule'

export async function createNewRule(
  authorId: string,
  code: string,
  shortDescription: string
): Promise<Rule> {
  const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/rules`, {
    method: 'POST',
    body: JSON.stringify({ authorId, code, shortDescription }),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (response.status !== 201) {
    throw new Error(await response.text())
  }

  return await response.json()
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

export async function getValidatedRules(authorId: string): Promise<Rule[]> {
  const response = await fetch(
    `${process.env.REACT_APP_API_BASE_URL}/rules?validated=true&authorId=${authorId}`,
    {
      method: 'GET',
    }
  )

  if (response.status !== 200) {
    throw new Error(await response.text())
  }

  const rules = await response.json()

  return rules ?? []
}

export async function updateCode(
  authorId: string,
  ruleId: string,
  code: string,
  shortDescription: string
): Promise<Rule> {
  const response = await fetch(
    `${process.env.REACT_APP_API_BASE_URL}/rules/${ruleId}`,
    {
      method: 'PATCH',
      body: JSON.stringify({ code, shortDescription }),
      headers: {
        'Content-Type': 'application/json',
        'Player-ID': authorId,
      },
    }
  )

  if (response.status !== 200) {
    throw new Error(await response.text())
  }

  return await response.json()
}
