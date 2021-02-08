import React, { ChangeEvent, useEffect, useState } from 'react'
import { Rule } from '../domain/rules/rule'
import * as RulesService from '../domain/rules/service'
import styles from './App.module.css'
import RuleEditor from './RuleEditor'
import RuleList from './RuleList'

const App = (): JSX.Element => {
  const [currentRule, setCurrentRule] = useState<Rule>()
  const [authorId, setAuthorId] = useState<string>(
    localStorage.getItem('authorId') ?? ''
  )

  useEffect(() => {
    if (authorId.length === 0) {
      return
    }

    let currentLoading = true
    ;(async () => {
      const ruleToValidate = await RulesService.getRuleToValidate(authorId)
      if (currentLoading) {
        setCurrentRule(ruleToValidate)
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
        <RuleList rules={[]} />
      </div>
      <div className={styles.mainPanel}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            {currentRule != null ? `Rule [${currentRule.id}]` : 'New rule'}
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
          setRule={setCurrentRule}
        />
      </div>
    </div>
  )
}

export default App
