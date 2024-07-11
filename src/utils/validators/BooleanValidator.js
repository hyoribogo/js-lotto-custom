import Validator from './Validator.js'

class BooleanValidator extends Validator {
  static #ERROR_MESSAGES = Object.freeze({
    INVALID_BOOLEAN: 'true 또는 false 값이 아닙니다.',
  })

  constructor(value) {
    super(value)
    BooleanValidator.#validate(value)
  }

  static from(value) {
    return new BooleanValidator(value)
  }

  static #validate(...args) {
    if (args.some((value) => typeof value !== 'boolean')) {
      throw new Error(this.#ERROR_MESSAGES.INVALID_BOOLEAN)
    }
  }
}

export default BooleanValidator
