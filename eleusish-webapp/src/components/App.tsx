import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { formatRuleName, Rule } from '../domain/rules/rule'
import * as RulesService from '../domain/rules/service'
import styles from './App.module.css'
import RuleEditor from './RuleEditor'
import RuleList from './RuleList'

const App = (): JSX.Element => {
  const [currentRule, setCurrentRule] = useState<Rule>()
  const [ruleToValidate, setRuleToValidate] = useState<Rule>()
  const [validatedRules, setValidatedRules] = useState<Rule[]>([])
  const [authorId, setAuthorId] = useState<string>(
    localStorage.getItem('authorId') ?? ''
  )

  const handleRuleSaved = useCallback((rule: Rule) => {
    setCurrentRule(rule)
    setRuleToValidate(rule)
  }, [])

  useEffect(() => {
    if (authorId.length === 0) {
      return
    }

    let currentLoading = true
    ;(async () => {
      const ruleToValidate = await RulesService.getRuleToValidate(authorId)
      const validatedRules = await RulesService.getValidatedRules(authorId)
      if (currentLoading) {
        setCurrentRule(ruleToValidate)
        setRuleToValidate(ruleToValidate)
        setValidatedRules(validatedRules)
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

  return (
    <div className={styles.page}>
      <div className={styles.sidePanel}>
        <RuleList
          ruleToValidate={ruleToValidate}
          validatedRules={validatedRules}
          onRuleSelected={setCurrentRule}
        />
      </div>
      <div className={styles.mainPanel}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            {currentRule != null ? formatRuleName(currentRule) : 'New rule'}
          </h1>
          <div className={styles.playerId}>
            <div className={styles.label}>Player ID:</div>
            <input
              onChange={handleChangeAuthorId}
              value={authorId}
              placeholder="pLaY3rID from the app!"
            />
          </div>
        </div>
        <RuleEditor
          authorId={authorId}
          rule={currentRule}
          onRuleSaved={handleRuleSaved}
          readOnly={
            ruleToValidate != null && ruleToValidate.id !== currentRule?.id
          }
        />
      </div>
    </div>
  )
}

export default App
