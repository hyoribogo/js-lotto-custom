import { describe, test, expect } from 'vitest'
import Lotto from '../domain/Lotto'
import { LOTTO } from '../constants/lottoValues'
import { ERROR_MESSAGES } from '../constants/errorMessages'

describe('Lotto > ', () => {
  // 범위, 개수에 대한 확장성을 위해 한 번 작성해본 테스트
  test(`${LOTTO.MIN_NUM} ~ ${LOTTO.MAX_NUM} 범위의 로또 번호 ${LOTTO.COUNT}개를 자동으로 생성할 수 있다.`, () => {
    const lotto = Lotto.generate()

    expect(lotto.getNumbers().length).toBe(LOTTO.COUNT)
    expect(
      lotto
        .getNumbers()
        .every((num) => num >= LOTTO.MIN_NUM && num <= LOTTO.MAX_NUM)
    ).toBe(true)
  })

  test('로또 번호를 수동으로 생성할 수 있다.', () => {
    expect(Lotto.generate([1, 2, 3, 4, 5, 6]).getNumbers()).toEqual([
      1, 2, 3, 4, 5, 6,
    ])
  })

  test('로또 번호는 자동으로 오름차순으로 정렬된다.', () => {
    expect(Lotto.generate([6, 5, 4, 3, 2, 1]).getNumbers()).toEqual([
      1, 2, 3, 4, 5, 6,
    ])
  })

  test('로또 번호를 수동으로 생성할 때 6개 미만 혹은 초과 번호를 입력하면 에러가 발생한다.', () => {
    expect(() => Lotto.generate([1, 2, 3, 4, 5])).toThrow(
      ERROR_MESSAGES.INVALID_LOTTO_COUNT
    )

    expect(() => Lotto.generate([1, 2, 3, 4, 5, 6, 7])).toThrow(
      ERROR_MESSAGES.INVALID_LOTTO_COUNT
    )
  })

  test('로또 번호를 수동으로 생성할 때 중복된 번호가 있으면 하나로 간주한다.', () => {
    expect(Lotto.generate([1, 2, 3, 4, 5, 6, 6]).getNumbers()).toEqual([
      1, 2, 3, 4, 5, 6,
    ])
  })

  test('로또 번호를 수동으로 생성할 때 1 ~ 45 사이의 숫자가 아닌 번호를 입력하면 에러가 발생한다.', () => {
    expect(() => Lotto.generate([1, 2, 3, 4, 5, 46])).toThrow(
      ERROR_MESSAGES.INVALID_LOTTO_NUMBER
    )

    expect(() => Lotto.generate([0, 1, 2, 3, 4, 5])).toThrow(
      ERROR_MESSAGES.INVALID_LOTTO_NUMBER
    )
  })
})
