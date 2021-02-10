import React from 'react'
import { Rule } from '../domain/rules/rule'
import RuleButton from './RuleButton'
import styles from './RuleList.module.css'

interface RuleListProps {
  ruleToValidate?: Rule
  validatedRules: Rule[]
  onRuleSelected: (rule?: Rule) => void
}

const RuleList = ({
  ruleToValidate,
  validatedRules,
  onRuleSelected,
}: RuleListProps): JSX.Element => {
  return (
    <div className={styles.ruleList}>
      {ruleToValidate == null && (
        <div>
          <button
            className={styles.ruleButton}
            onClick={() => onRuleSelected(undefined)}
          >
            New rule
          </button>
        </div>
      )}
      {ruleToValidate != null && (
        <div>
          <div>Rule to validate:</div>
          <RuleButton rule={ruleToValidate} onClick={onRuleSelected} />
        </div>
      )}
      <div>
        <div>Validated rules:</div>
        {validatedRules.map((rule, index) => (
          <RuleButton key={index} rule={rule} onClick={onRuleSelected} />
        ))}
      </div>
    </div>
  )
}

export default RuleList
