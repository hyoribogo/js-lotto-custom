import { LOTTO } from '../constants/lottoValues.js'
import LottoValidator from './LottoValidator.js'

class LottoRuleManager {
  #rules

  constructor() {
    this.#rules = LOTTO.DEFAULT_WINNING_RULES
  }

  getRules() {
    return [...this.#rules]
  }

  getRule({ value, bonus = false }) {
    return this.#rules.find(
      (rule) => rule.value === value && rule.bonus === bonus
    )
  }

  #getSortedRules(rules) {
    return rules.sort((rule1, rule2) =>
      rule1.value === rule2.value
        ? rule1.bonus
          ? 1
          : -1
        : rule1.value - rule2.value
    )
  }

  removeRules() {
    this.#rules = []

    return this
  }

  setRules(rules) {
    LottoValidator.validateRules(rules)
    this.#rules = rules

    return this
  }

  setRule({ value, prize, bonus = false }) {
    LottoValidator.validateRule({ value, prize, bonus })

    const prevIndex = this.#rules.findIndex(
      (rule) => rule.value === value && rule.bonus === bonus
    )

    if (prevIndex === -1) {
      this.#rules = this.#getSortedRules([
        ...this.#rules,
        { value, prize, bonus },
      ])

      return this
    }

    this.#rules[prevIndex] = { value, prize, bonus }

    return this
  }
}

export default LottoRuleManager
