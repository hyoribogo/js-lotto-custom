import { ERROR_MESSAGES } from '../constants/errorMessages.js'
import { LOTTO } from '../constants/lottoValues.js'
import ArrayValidator from '../utils/validators/ArrayValidator.js'
import NumberValidator from '../utils/validators/NumberValidator.js'

class LottoValidator {
  static validateNumbers(numbers) {
    ArrayValidator.from(numbers)
    NumberValidator.from(numbers.length).sameAs(
      LOTTO.COUNT,
      ERROR_MESSAGES.INVALID_LOTTO_COUNT
    )

    numbers.forEach((number) => this.validateNumber(number))
  }

  static validateWinningNumbers(winningNumbers) {
    ArrayValidator.from(winningNumbers)
    winningNumbers.forEach((number) => this.validateNumber(number))
  }

  static validateNumber(number) {
    NumberValidator.from(number)
      .greaterThanOrEqual(LOTTO.MIN_NUM, ERROR_MESSAGES.INVALID_LOTTO_NUMBER)
      .lessThanOrEqual(LOTTO.MAX_NUM, ERROR_MESSAGES.INVALID_LOTTO_NUMBER)
  }
}

export default LottoValidator
