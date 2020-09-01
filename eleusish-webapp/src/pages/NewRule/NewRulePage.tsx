import React, { ReactElement, useState } from 'react'
import { ControlledEditor } from '@monaco-editor/react'
import styles from './NewRulePage.module.css'
import * as RulesService from '../../domain/rules/service'

const defaultRule = `function getInitialCards (remainingCards) {
  return [];
}

function isValid (previousCards, newCard) {
  return true;
}
`

const NewRulePage = (): ReactElement => {
  const [code, setCode] = useState<string | undefined>(defaultRule)
  const [authorId, setAuthorId] = useState<string>('')
  const [submitting, setSubmitting] = useState<boolean>(false)

  const handleSubmit = async () => {
    if (code == null || code.length === 0 || authorId.length === 0) {
      return
    }

    setSubmitting(true)
    try {
      await RulesService.createNewRule(authorId, code)
    } catch (e) {
      console.error(`error while creating rule: ${e.message}`)
    }
    setSubmitting(false)
  }

  return (
    <div className={styles.newRulePage}>
      <h1>New rule</h1>
      <input
        placeholder="Player ID"
        onChange={(event) => setAuthorId(event.target.value)}
      />
      <ControlledEditor
        theme="dark"
        height="75vh"
        language="javascript"
        options={{ minimap: { enabled: false } }}
        value={code}
        onChange={(event, value) => setCode(value)}
      />
      <button
        disabled={submitting || code == null || code.length === 0}
        type="button"
        onClick={handleSubmit}
      >
        Submit new rule
      </button>
    </div>
  )
}

export default NewRulePage
