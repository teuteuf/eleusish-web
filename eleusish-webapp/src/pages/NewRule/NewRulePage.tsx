import React, { ChangeEvent, ReactElement, useEffect, useState } from 'react'
import { ControlledEditor } from '@monaco-editor/react'
import styles from './NewRulePage.module.css'
import * as RulesService from '../../domain/rules/service'
import { Rule } from '../../domain/rules/rule'

const defaultRule = `
function getInitialCards (remainingCards) {
  return [];
}

function isValid (previousCards, newCard) {
  return true;
}
`

const NewRulePage = (): ReactElement => {
  const [currentRule, setCurrentRule] = useState<Rule>()
  const [code, setCode] = useState<string | undefined>(defaultRule)
  const [authorId, setAuthorId] = useState<string>(
    localStorage.getItem('authorId') ?? ''
  )
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [error, setError] = useState<string>()

  const submitAllowed =
    code != null && code.length !== 0 && authorId.length !== 0 && !submitting

  useEffect(() => {
    if (authorId.length === 0) {
      return
    }

    let currentLoading = true
    ;(async () => {
      const ruleToValidate = await RulesService.getRuleToValidate(authorId)
      if (currentLoading) {
        setCurrentRule(ruleToValidate)
        setCode(ruleToValidate?.code ?? defaultRule)
      }
    })()

    return () => {
      currentLoading = false
    }
  }, [authorId])

  const handleChangeAuthorId = (e: ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem('authorId', e.target.value)
    setAuthorId(e.target.value)
  }

  const handleSubmit = async () => {
    if (code == null || !submitAllowed) {
      setError('submit not allowed')
      return
    }

    setSubmitting(true)
    try {
      let rule
      if (currentRule == null) {
        rule = await RulesService.createNewRule(authorId, code)
      } else {
        rule = await RulesService.updateCode(currentRule.id, code)
      }

      setCurrentRule(rule)
      setError(undefined)
    } catch (e) {
      const errorMessage = `error while creating rule: ${e.message}`
      setError(errorMessage)
      console.error(errorMessage)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className={styles.newRulePage}>
      <h1>{currentRule != null ? `Rule [${currentRule.id}]` : 'New rule'}</h1>
      <input
        placeholder="Player ID"
        onChange={handleChangeAuthorId}
        value={authorId}
      />
      <div className={styles.editor}>
        <ControlledEditor
          theme="dark"
          language="javascript"
          options={{ minimap: { enabled: false }, scrollBeyondLastLine: false }}
          value={code}
          onChange={(event, value) => setCode(value)}
        />
      </div>
      <div className={error && styles.error}>Error: {error ?? 'none'}</div>
      <button disabled={!submitAllowed} type="button" onClick={handleSubmit}>
        Submit new rule
      </button>
    </div>
  )
}

export default NewRulePage
