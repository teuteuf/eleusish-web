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
  const [submitting, setSubmitting] = useState<boolean>(false)

  const handleSubmit = async () => {
    if (code == null || code.length === 0) {
      return
    }

    setSubmitting(true)
    await RulesService.createNewRule(code)
    setSubmitting(false)
  }

  return (
    <div className={styles.newRulePage}>
      <h1>New rule</h1>
      <ControlledEditor
        theme="dark"
        height="80vh"
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
