import { ERROR_MESSAGES } from '../constants/errorMessages.js'
import { LOTTO } from '../constants/lottoValues.js'
import deepClone from '../utils/deepClone.js'
import generateUniqueNumbers from '../utils/generateUniqueNumbers.js'
import NumberValidator from '../utils/validators/NumberValidator.js'
import Lotto from './Lotto.js'

class LottoController {
  #lottos
  #winningNumbers
  #winningRules

  constructor() {
    this.#lottos = []
    this.#winningNumbers = { main: new Set(), bonus: null }
    this.#winningRules = deepClone(LOTTO.DEFAULT_WINNING_RULES)
  }

  get lottos() {
    return [...this.#lottos]
  }

  get winningNumbers() {
    return {
      main: [...this.#winningNumbers.main],
      bonus: this.#winningNumbers.bonus,
    }
  }

  get winningRules() {
    return deepClone(this.#winningRules)
  }

  purchase(paidAmount) {
    LottoController.#validatePaidAmount(paidAmount)

    const lottoCount = Math.floor(paidAmount / LOTTO.PRICE)
    const newLottos = Array.from({ length: lottoCount }, () => Lotto.generate())

    this.#lottos = [...this.lottos, ...newLottos]

    return this
  }

  addWinningNumbersWithAuto(amount) {
    const prevAmount = this.winningNumbers.main.length || 0
    const prevLottoSet = new Set(this.winningNumbers.main)

    const newWinningNumbers = generateUniqueNumbers(
      amount + prevAmount,
      LOTTO.MIN_NUM,
      LOTTO.MAX_NUM,
      prevLottoSet
    )

    this.#winningNumbers.main = new Set([
      ...this.winningNumbers.main,
      ...newWinningNumbers,
    ])

    this.#lottos.forEach((lotto) => {
      lotto.addMainNumbers(...this.winningNumbers.main)
    })

    return this
  }

  addWinningNumbersWithManual(numbers) {
    this.#winningNumbers.main = new Set(numbers)

    this.#lottos.forEach((lotto) => {
      lotto.addMainNumbers(...numbers)
    })

    return this
  }

  addBonusNumber(number) {
    this.#winningNumbers.bonus = number

    this.#lottos.forEach((lotto) => {
      lotto.addBonusNumber(number)
    })

    return this
  }

  addWinningRule(ruleKey, ruleValue) {
    LottoController.#validateRuleValue(ruleValue)
    this.#winningRules[ruleKey] = ruleValue

    return this
  }

  setWinningRules(newRules) {
    this.#winningRules = {}

    Object.entries(newRules).forEach(([key, value]) => {
      LottoController.#validateRuleValue(value)
      this.#winningRules[key] = value
    })

    return this
  }

  static #validatePaidAmount(paidAmount) {
    NumberValidator.from(paidAmount).greaterThanOrEqual(
      LOTTO.PRICE,
      ERROR_MESSAGES.LOTTO_PRICE_TOO_LOW
    )
  }

  static #validateRuleValue(ruleValue) {
    if (
      !ruleValue.hasOwnProperty('matchCount') ||
      !ruleValue.hasOwnProperty('prize')
    ) {
      throw new Error(ERROR_MESSAGES.INVALID_WINNING_RULE)
    }
  }
}

export default LottoController
