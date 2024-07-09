import { describe, test, expect } from 'vitest'
import LottoController from '../domain/LottoController.js'
import { LOTTO } from '../constants/lottoValues.js'
import { ERROR_MESSAGES } from '../constants/errorMessages.js'

describe('LottoController > ', () => {
  test('8000원을 지불하면 로또 8개를 살 수 있다.', () => {
    expect(new LottoController().purchase(8000).lottos.length).toBe(8)
  })

  test('7500원을 지불하면 로또 7개를 살 수 있다.', () => {
    expect(new LottoController().purchase(7500).lottos.length).toBe(7)
  })

  test.each([
    [
      { paidAmount: LOTTO.PRICE - 1000 },
      { paidAmount: LOTTO.PRICE - 20000 },
      { paidAmount: LOTTO.PRICE - 1 },
    ],
  ])(
    `로또를 ${LOTTO.PRICE}원 미만으로 구매할 수 없다.: $paidAmount원`,
    ({ paidAmount }) => {
      expect(() => new LottoController().purchase(paidAmount)).toThrow(
        ERROR_MESSAGES.LOTTO_PRICE_TOO_LOW
      )
    }
  )

  test('로또 당첨 번호를 자동으로 추가할 수 있다.', () => {
    const winningNumbers = new LottoController().addWinningNumbersWithAuto(6)
      .winningNumbers.main

    expect(winningNumbers.length).toBe(6)
    expect(
      winningNumbers.every(
        (num) => num >= LOTTO.MIN_NUM && num <= LOTTO.MAX_NUM
      )
    ).toBe(true)
  })

  test('로또 당첨 번호를 수동으로 추가할 수 있다.', () => {
    const winningNumbers = new LottoController().addWinningNumbersWithManual([
      1, 2, 3, 4, 5, 6,
    ]).winningNumbers.main

    expect(winningNumbers).toEqual([1, 2, 3, 4, 5, 6])
  })

  test('보너스 당첨 번호를 추가할 수 있다.', () => {
    const winningNumbers = new LottoController()
      .addWinningNumbersWithManual([1, 2, 3, 4, 5, 6])
      .addBonusNumber(7).winningNumbers

    expect(winningNumbers.main).toEqual([1, 2, 3, 4, 5, 6])
    expect(winningNumbers.bonus).toBe(7)
  })

  test('로또 당첨 규칙을 정할 수 있다.', () => {
    const customRule = {
      THREE_MATCH: { matchCount: 3, prize: 100000 },
      FOUR_MATCH: { matchCount: 4, prize: 500000 },
      FIVE_MATCH: { matchCount: 5, prize: 10000000 },
      SIX_MATCH: { matchCount: 6, prize: 1000000000 },
    }

    expect(
      new LottoController().setWinningRules(customRule).winningRules
    ).toEqual(customRule)
  })

  test('로또 당첨 규칙을 정하지 않으면 기본 규칙이 적용된다.', () => {
    expect(new LottoController().winningRules).toEqual(
      LOTTO.DEFAULT_WINNING_RULES
    )
  })

  test('로또 당첨 규칙을 개별로 정할 수 있다.: 0개 일치 시 1,000,000원', () => {
    const newRuleKey = 'ZERO_MATCH'
    const newRule = { matchCount: 0, prize: 1000000 }

    expect(
      new LottoController().addWinningRule(newRuleKey, newRule).winningRules[
        newRuleKey
      ]
    ).toEqual(newRule)
  })

  test('로또 당첨 통계를 확인할 수 있다.', () => {})

  test('총 수익률을 확인할 수 있다.')
})
