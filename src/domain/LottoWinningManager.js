import { LOTTO } from '../constants/lottoValues.js'
import generateUniqueNumbers from '../utils/generateUniqueNumbers.js'
import LottoValidator from './LottoValidator.js'

class LottoWinningManager {
  #winningNumbers
  #bonusNumber

  constructor() {
    this.#winningNumbers = new Set()
    this.#bonusNumber = null
  }

  getWinningNumbers() {
    return [...this.#winningNumbers]
  }

  getBonusNumber() {
    return this.#bonusNumber
  }

  getWinningResult(lotto) {
    const result = { main: [], bonus: null }

    lotto.getNumbers().forEach((number) => {
      if (this.#winningNumbers.has(number)) {
        result.main.push(number)
      }

      if (number === this.#bonusNumber) {
        result.bonus = number
      }
    })

    return result
  }

  generateWinningNumbers(winningNumbers) {
    LottoValidator.validateWinningNumbers(winningNumbers)
    this.#winningNumbers = new Set([...this.#winningNumbers, ...winningNumbers])

    return this
  }

  autoGenerateWinningNumbers(amount) {
    const prevAmount = this.#winningNumbers.size
    const newWinningNumbers = generateUniqueNumbers(
      amount + prevAmount,
      LOTTO.MIN_NUM,
      LOTTO.MAX_NUM,
      this.#winningNumbers
    )

    this.#winningNumbers = new Set([
      ...this.#winningNumbers,
      ...newWinningNumbers,
    ])

    return this
  }

  setBonusNumber(bonusNumber) {
    LottoValidator.validateNumber(bonusNumber)
    this.#bonusNumber = bonusNumber

    return this
  }

  autoSetBonusNumber() {
    const bonusNumber = generateUniqueNumbers(1, LOTTO.MIN_NUM, LOTTO.MAX_NUM)
    this.#bonusNumber = bonusNumber[0]

    return this
  }
}

export default LottoWinningManager
