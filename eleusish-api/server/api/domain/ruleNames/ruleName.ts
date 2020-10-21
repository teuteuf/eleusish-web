import { godsSyllables } from './godsSyllables'

interface RuleName {
  id: string
  godName: string
  number: number
}

function generateGodName(): string {
  let nbSyllables = 0
  let name = ''
  while (true) {
    const possibleNameSyllables = godsSyllables.filter(
      (syllables) => syllables.length > nbSyllables
    )
    const pickedName =
      possibleNameSyllables[
        Math.floor(Math.random() * possibleNameSyllables.length)
      ]

    name += pickedName[nbSyllables]
    nbSyllables++

    if (pickedName.length === nbSyllables) {
      return name
    }
  }
}

export { RuleName, generateGodName }
