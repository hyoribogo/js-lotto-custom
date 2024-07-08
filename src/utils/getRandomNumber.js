import NumberValidator from './validators/NumberValidator.js'

/**
 * 주어진 범위 내에서 랜덤 숫자를 반환하는 함수
 *
 * @param {number} min
 * @param {number} max
 *
 * @example
 * // 0부터 10까지의 랜덤 숫자 반환
 * getRandomNumber(0, 10);
 *
 * @example
 * // 5부터 15까지의 랜덤 숫자 반환
 * getRandomNumber(5, 15);
 */
function getRandomNumber(min, max) {
  NumberValidator.from(min).lessThanOrEqual(max)
  NumberValidator.from(max)

  return Math.floor(Math.random() * (max - min + 1)) + min
}

export default getRandomNumber
