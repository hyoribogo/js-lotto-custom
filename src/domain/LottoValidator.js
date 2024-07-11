import { ERROR_MESSAGES } from '../constants/errorMessages.js'
import { LOTTO } from '../constants/lottoValues.js'
import ArrayValidator from '../utils/validators/ArrayValidator.js'
import BooleanValidator from '../utils/validators/BooleanValidator.js'
import NumberValidator from '../utils/validators/NumberValidator.js'

class LottoValidator {
  static validateNumbers(numbers) {
    ArrayValidator.from(numbers)
    NumberValidator.from(numbers.length).sameAs(
      LOTTO.COUNT,
      ERROR_MESSAGES.INVALID_LOTTO_COUNT
    )

    numbers.forEach(this.validateNumber)
  }

  static validateWinningNumbers(winningNumbers) {
    ArrayValidator.from(winningNumbers)
    winningNumbers.forEach(this.validateNumber)
  }

  static validateNumber(number) {
    NumberValidator.from(number)
      .greaterThanOrEqual(LOTTO.MIN_NUM, ERROR_MESSAGES.INVALID_LOTTO_NUMBER)
      .lessThanOrEqual(LOTTO.MAX_NUM, ERROR_MESSAGES.INVALID_LOTTO_NUMBER)
  }

  static validateRules(rules) {
    ArrayValidator.from(rules)
    rules.forEach(this.validateRule)
  }

  static validateRule({ value, prize, bonus }) {
    NumberValidator.from(value)
      .greaterThanOrEqual(0, ERROR_MESSAGES.INVALID_WINNING_COUNT)
      .assertInteger(ERROR_MESSAGES.NOT_WINNING_INTEGER)
    NumberValidator.from(prize).greaterThanOrEqual(
      0,
      ERROR_MESSAGES.INVALID_WINNING_PRIZE
    )
    BooleanValidator.from(bonus)
  }
}

export default LottoValidator
