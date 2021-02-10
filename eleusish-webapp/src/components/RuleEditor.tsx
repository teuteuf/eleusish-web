import React, { ChangeEvent, useEffect, useState } from 'react'
import { defaultRule } from '../constants'
import { Rule } from '../domain/rules/rule'
import * as RulesService from '../domain/rules/service'
import appStyles from './App.module.css'
import ruleEditorStyles from './RuleEditor.module.css'
import { ControlledEditor } from '@monaco-editor/react'

interface RuleEditorProps {
  authorId: string
  rule?: Rule
  onRuleSaved: (rule: Rule) => void
  readOnly: boolean
}

const RuleEditor = ({
  authorId,
  rule,
  onRuleSaved,
  readOnly,
}: RuleEditorProps): JSX.Element => {
  const [code, setCode] = useState<string | undefined>(defaultRule)
  const [shortDescription, setShortDescription] = useState<string>('')
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [error, setError] = useState<string>()

  const submitAllowed =
    !readOnly &&
    code != null &&
    code.length !== 0 &&
    authorId.length !== 0 &&
    !submitting

  useEffect(() => {
    setCode(rule?.code ?? defaultRule)
    setShortDescription(rule?.shortDescription ?? '')
  }, [rule])

  const handleChangeShortDescription = (e: ChangeEvent<HTMLInputElement>) => {
    setShortDescription(e.target.value)
  }

  const handleSubmit = async () => {
    if (code == null || !submitAllowed) {
      setError('submit not allowed')
      return
    }

    setSubmitting(true)
    try {
      let submittedRule
      if (rule == null) {
        submittedRule = await RulesService.createNewRule(
          authorId,
          code,
          shortDescription
        )
      } else {
        submittedRule = await RulesService.updateCode(
          authorId,
          rule.id,
          code,
          shortDescription
        )
      }

      onRuleSaved(submittedRule)
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
    <>
      <div className={ruleEditorStyles.info}>
        <div className={ruleEditorStyles.shortDescription}>
          <div className={appStyles.label}>Short Description:</div>
          <input
            onChange={handleChangeShortDescription}
            value={shortDescription}
            placeholder="this won't be displayed to player!"
            disabled={readOnly}
          />
        </div>
      </div>
      <div className={ruleEditorStyles.editor}>
        <ControlledEditor
          theme="dark"
          language="javascript"
          options={{
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            readOnly,
          }}
          value={code}
          onChange={(event, value) => setCode(value)}
        />
      </div>
      <div className={error && ruleEditorStyles.error}>
        Error: {error ?? 'none'}
      </div>
      <button disabled={!submitAllowed} type="button" onClick={handleSubmit}>
        {rule != null ? 'Update rule' : 'Submit new rule'}
      </button>
    </>
  )
}

export default RuleEditor
