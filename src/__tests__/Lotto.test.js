import { describe, test, expect } from 'vitest'
import Lotto from '../domain/Lotto'
import { LOTTO } from '../constants/lottoValues'
import { ERROR_MESSAGES } from '../constants/errorMessages'

describe('Lotto > ', () => {
  // 범위, 개수에 대한 확장성을 위해 한 번 작성해본 테스트
  test(`${LOTTO.MIN_NUM} ~ ${LOTTO.MAX_NUM} 범위의 로또 번호 ${LOTTO.COUNT}개를 자동으로 생성할 수 있다.`, () => {
    const lotto = Lotto.generate({ auto: true })

    expect(lotto.numbers.length).toBe(LOTTO.COUNT)
    expect(
      lotto.numbers.every((num) => num >= LOTTO.MIN_NUM && num <= LOTTO.MAX_NUM)
    ).toBe(true)
  })

  test('로또 번호를 수동으로 생성할 수 있다.', () => {
    const lotto = Lotto.generate({ auto: false, numbers: [1, 2, 3, 4, 5, 6] })

    expect(lotto.numbers).toEqual([1, 2, 3, 4, 5, 6])
  })

  test('로또 번호는 자동으로 오름차순으로 정렬된다.', () => {
    const lotto = Lotto.generate({ auto: false, numbers: [6, 5, 4, 3, 2, 1] })

    expect(lotto.numbers).toEqual([1, 2, 3, 4, 5, 6])
  })

  test('로또 번호를 수동으로 생성할 때 6개 미만 혹은 초과 번호를 입력하면 에러가 발생한다.', () => {
    expect(() =>
      Lotto.generate({ auto: false, numbers: [1, 2, 3, 4, 5] })
    ).toThrow(ERROR_MESSAGES.INVALID_LOTTO_COUNT)

    expect(() =>
      Lotto.generate({ auto: false, numbers: [1, 2, 3, 4, 5, 6, 7] })
    ).toThrow(ERROR_MESSAGES.INVALID_LOTTO_COUNT)
  })

  test('로또 번호를 수동으로 생성할 때 중복된 번호가 있으면 하나로 간주한다.', () => {
    const lotto = Lotto.generate({
      auto: false,
      numbers: [1, 2, 3, 4, 5, 6, 6],
    })

    expect(lotto.numbers).toEqual([1, 2, 3, 4, 5, 6])
  })

  test('로또 번호를 수동으로 생성할 때 1 ~ 45 사이의 숫자가 아닌 번호를 입력하면 에러가 발생한다.', () => {
    expect(() =>
      Lotto.generate({ auto: false, numbers: [1, 2, 3, 4, 5, 46] })
    ).toThrow(ERROR_MESSAGES.INVALID_LOTTO_NUMBER)

    expect(() =>
      Lotto.generate({ auto: false, numbers: [0, 1, 2, 3, 4, 5] })
    ).toThrow(ERROR_MESSAGES.INVALID_LOTTO_NUMBER)
  })

  test('로또 당첨 번호를 추가하면 기존 로또 번호와 일치하는 당첨 번호를 알 수 있다.', () => {
    expect(
      Lotto.generate({
        auto: false,
        numbers: [1, 2, 3, 4, 5, 6],
      }).addMainNumbers(1, 3, 5, 7).matchedNumbers.main
    ).toEqual([1, 3, 5])
  })

  test('보너스 당첨 번호를 추가할 수 있다.', () => {
    expect(
      Lotto.generate({
        auto: false,
        numbers: [1, 2, 3, 4, 5, 6],
      }).addBonusNumber(5).matchedNumbers.bonus
    ).toBe(5)
  })

  test('이미 당첨된 번호로 또 번호를 추가하면 아무 일도 일어나지 않는다.', () => {
    expect(
      Lotto.generate({
        auto: false,
        numbers: [1, 2, 3, 4, 5, 6],
      })
        .addMainNumbers(1, 3, 5, 7)
        .addMainNumbers(1)
        .addMainNumbers(1)
        .addMainNumbers(1).matchedNumbers.main
    ).toEqual([1, 3, 5])
  })

  test('이미 당첨된 번호로 보너스 번호를 추가하면 에러가 발생한다.', () => {
    expect(() =>
      Lotto.generate({
        auto: false,
        numbers: [1, 2, 3, 4, 5, 6],
      })
        .addMainNumbers(1, 3, 5, 7)
        .addBonusNumber(1)
    ).toThrow(ERROR_MESSAGES.ALREADY_WINNING_NUMBER)
  })

  test('1 ~ 45 사이의 숫자가 아닌 보너스 번호를 추가하면 에러가 발생한다.', () => {
    expect(() =>
      Lotto.generate({
        auto: false,
        numbers: [1, 2, 3, 4, 5, 6],
      }).addBonusNumber(46)
    ).toThrow(ERROR_MESSAGES.INVALID_LOTTO_NUMBER)

    expect(() =>
      Lotto.generate({
        auto: false,
        numbers: [1, 2, 3, 4, 5, 6],
      }).addBonusNumber(0)
    ).toThrow(ERROR_MESSAGES.INVALID_LOTTO_NUMBER)
  })

  test('당첨된 로또 개수를 알 수 있다.', () => {
    expect(
      Lotto.generate({
        auto: false,
        numbers: [1, 2, 3, 4, 5, 6],
      }).addMainNumbers(1, 3, 5, 7).matchedCount
    ).toEqual({ main: 3, bonus: 0 })
  })
})
