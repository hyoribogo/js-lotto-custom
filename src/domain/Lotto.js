import { LOTTO } from '../constants/lottoValues.js'
import generateUniqueNumbers from '../utils/generateUniqueNumbers.js'
import LottoValidator from './LottoValidator.js'

class Lotto {
  #numbers

  constructor(numbers) {
    LottoValidator.validateNumbers([...new Set(numbers)])
    this.#numbers = new Set(numbers)
  }

  static generate(numbers) {
    if (numbers === undefined) {
      const randomNumbers = generateUniqueNumbers(
        LOTTO.COUNT,
        LOTTO.MIN_NUM,
        LOTTO.MAX_NUM
      )

      return new Lotto(randomNumbers.sort((num1, num2) => num1 - num2))
    }

    return new Lotto(numbers.sort((num1, num2) => num1 - num2))
  }

  getNumbers() {
    return [...this.#numbers]
  }
}

export default Lotto
