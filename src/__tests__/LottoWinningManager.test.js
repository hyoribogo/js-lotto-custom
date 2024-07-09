import { describe, test, expect } from 'vitest'
import Lotto from '../domain/Lotto.js'
import LottoWinningManager from '../domain/LottoWinningManager'
import { ERROR_MESSAGES } from '../constants/errorMessages.js'

describe('LottoWinningManager > ', () => {
  test('로또 당첨 번호를 추가하면 기존 로또 번호와 일치하는 당첨 번호를 알 수 있다.', () => {
    const lotto = Lotto.generate([1, 2, 3, 4, 5, 6])

    expect(
      new LottoWinningManager()
        .generateWinningNumbers([1, 3, 7])
        .getWinningResult(lotto).main
    ).toEqual([1, 3])
  })

  test('이미 당첨된 번호로 또 번호를 추가하면 아무 일도 일어나지 않는다.', () => {
    const lottoWinningManager =
      new LottoWinningManager().generateWinningNumbers([1, 3, 7])

    expect(() =>
      lottoWinningManager.generateWinningNumbers([1, 3, 7])
    ).not.toThrow()
    expect(lottoWinningManager.getWinningNumbers()).toEqual([1, 3, 7])
  })

  test.each([{ amount: 1, amount: 4, amount: 10 }])(
    '당첨 번호를 원하는 개수만큼 자동으로 추가할 수 있다. : $amount개',
    ({ amount }) => {
      expect(
        new LottoWinningManager()
          .autoGenerateWinningNumbers(amount)
          .getWinningNumbers().length
      ).toBe(amount)
    }
  )

  test('보너스 당첨 번호를 추가할 수 있다.', () => {
    expect(new LottoWinningManager().setBonusNumber(7).getBonusNumber()).toBe(7)
  })

  test('보너스 당첨 번호를 자동으로 추가할 수 있다.', () => {
    const lottoWinningManager = new LottoWinningManager()
    const autoNum = lottoWinningManager.autoSetBonusNumber().getBonusNumber()

    expect(autoNum).toBeGreaterThanOrEqual(1)
    expect(autoNum).toBeLessThanOrEqual(45)
  })

  test('1 ~ 45 사이의 숫자가 아닌 보너스 번호를 추가하면 에러가 발생한다.', () => {
    expect(() => new LottoWinningManager().setBonusNumber(46)).toThrow(
      ERROR_MESSAGES.INVALID_LOTTO_NUMBER
    )
    expect(() => new LottoWinningManager().setBonusNumber(0)).toThrow(
      ERROR_MESSAGES.INVALID_LOTTO_NUMBER
    )
  })
})
