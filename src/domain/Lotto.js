import { ERROR_MESSAGES } from '../constants/errorMessages.js'
import { LOTTO } from '../constants/lottoValues.js'
import generateUniqueNumbers from '../utils/generateUniqueNumbers.js'
import ArrayValidator from '../utils/validators/ArrayValidator.js'
import NumberValidator from '../utils/validators/NumberValidator.js'

class Lotto {
  #numbers
  #matchedNumbers

  constructor(numbers) {
    Lotto.#validateNumbers(numbers)
    this.#numbers = numbers
    this.#matchedNumbers = { main: new Set(), bonus: null }
  }

  get numbers() {
    return [...this.#numbers]
  }

  get matchedNumbers() {
    return {
      main: [...this.#matchedNumbers.main],
      bonus: this.#matchedNumbers.bonus,
    }
  }

  get matchedCount() {
    return {
      main: this.#matchedNumbers.main.size,
      bonus: this.#matchedNumbers.bonus ? 1 : 0,
    }
  }

  addMainNumbers(...numbers) {
    Lotto.#validateWinningNumbers({ main: numbers })

    const matchedWinningNumbers = numbers.filter((number) =>
      this.#numbers.includes(number)
    )

    this.#matchedNumbers.main = new Set([
      ...this.#matchedNumbers.main,
      ...matchedWinningNumbers,
    ])

    return this
  }

  addBonusNumber(number) {
    if (this.#matchedNumbers.main.has(number)) {
      throw new Error(ERROR_MESSAGES.ALREADY_WINNING_NUMBER)
    }

    Lotto.#validateNumber(number)

    this.#matchedNumbers.bonus = number

    return this
  }

  static generate({ auto = true, numbers = [] } = {}) {
    if (auto) {
      const newNumbers = generateUniqueNumbers(
        LOTTO.COUNT,
        LOTTO.MIN_NUM,
        LOTTO.MAX_NUM
      )

      return new Lotto(newNumbers.sort((num1, num2) => num1 - num2))
    }

    return new Lotto(
      Array.from(new Set(numbers)).sort((num1, num2) => num1 - num2)
    )
  }

  static #validateNumbers(numbers) {
    ArrayValidator.from(numbers)
    NumberValidator.from(numbers.length).sameAs(
      LOTTO.COUNT,
      ERROR_MESSAGES.INVALID_LOTTO_COUNT
    )

    numbers.forEach((number) => this.#validateNumber(number))
  }

  static #validateWinningNumbers({ main = [], bonus }) {
    ArrayValidator.from(main)

    main.forEach((number) => this.#validateNumber(number))
    bonus !== undefined && this.#validateNumber(bonus)
  }

  static #validateNumber(number) {
    NumberValidator.from(number)
      .greaterThanOrEqual(LOTTO.MIN_NUM, ERROR_MESSAGES.INVALID_LOTTO_NUMBER)
      .lessThanOrEqual(LOTTO.MAX_NUM, ERROR_MESSAGES.INVALID_LOTTO_NUMBER)
  }
}

export default Lotto
