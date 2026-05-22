import type { Group, Rule } from './types'

const quote = (value: string): string => `'${value.replace(/'/g, "\\'")}'`

const stringifyRule = (rule: Rule): string => {
  if (!rule.field) return ''
  return `${rule.field} ${rule.operator} ${quote(rule.value)}`
}

export const stringifyCondition = (node: Rule | Group): string => {
  if (node.kind === 'rule') return stringifyRule(node)

  const parts = node.children.map(stringifyCondition).filter(Boolean)

  if (parts.length === 0) return ''
  if (parts.length === 1) return parts[0]
  return `(${parts.join(` ${node.combinator} `)})`
}
