import React from 'react'
import { formatRuleName, Rule } from '../domain/rules/rule'
import styles from './RuleList.module.css'

interface RuleButtonProps {
  rule: Rule
  onClick: (rule: Rule) => void
}

const RuleButton = ({ rule, onClick }: RuleButtonProps): JSX.Element => {
  return (
    <div className={styles.ruleButton}>
      <button onClick={() => onClick(rule)}>{formatRuleName(rule)}</button>
      <span>{rule.shortDescription}</span>
    </div>
  )
}

export default RuleButton
