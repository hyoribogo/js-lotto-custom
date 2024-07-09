import { describe, test, expect } from 'vitest'

describe('LottoWinningManager > ', () => {
  test(
    '로또 당첨 번호를 추가하면 기존 로또 번호와 일치하는 당첨 번호를 알 수 있다.'
  )

  test('보너스 당첨 번호를 추가할 수 있다.')

  test('이미 당첨된 번호로 또 번호를 추가하면 아무 일도 일어나지 않는다.')

  test('이미 당첨된 번호로 보너스 번호를 추가하면 에러가 발생한다.')

  test('1 ~ 45 사이의 숫자가 아닌 보너스 번호를 추가하면 에러가 발생한다.')

  test('당첨된 로또 개수를 알 수 있다.')
})
