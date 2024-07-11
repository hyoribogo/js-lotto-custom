import { describe, test, expect } from 'vitest'
import LottoRuleManager from '../domain/LottoRuleManager.js'
import { LOTTO } from '../constants/lottoValues.js'

describe('LottoRuleManager > ', () => {
  test('로또 당첨 규칙을 정할 수 있다.', () => {
    const customRules = [
      {
        value: 0,
        prize: 1000000,
        bonus: false,
      },
      {
        value: 1,
        prize: 0,
        bonus: false,
      },
      {
        value: 2,
        prize: 2000,
        bonus: true,
      },
    ]

    expect(new LottoRuleManager().setRules(customRules).getRules()).toEqual(
      customRules
    )
  })

  test('로또 당첨 규칙을 정하지 않으면 기본 규칙이 적용된다.', () => {
    expect(new LottoRuleManager().getRules()).toEqual(
      LOTTO.DEFAULT_WINNING_RULES
    )
  })

  test('로또 당첨 규칙을 전부 없앨 수 있다.', () => {
    expect(new LottoRuleManager().removeRules().getRules()).toEqual([])
  })

  test('로또 당첨 규칙을 개별로 정할 수 있다.: 0개 일치 시 1,000,000원', () => {
    const customRule = {
      value: 0,
      prize: 1000000,
      bonus: false,
    }

    expect(
      new LottoRuleManager()
        .setRule(customRule)
        .getRule({ value: customRule.value })
    ).toEqual(customRule)
  })
})
