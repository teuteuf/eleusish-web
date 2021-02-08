import React from 'react'
import { Rule } from '../domain/rules/rule'

interface RuleListProps {
  rules: Rule[]
}

const RuleList = ({ rules }: RuleListProps): JSX.Element => {
  return (
    <>
      <div>Rules:</div>
      {rules.map((rule, index) => (
        <div key={index}>{rule.id}</div>
      ))}
    </>
  )
}

export default RuleList
