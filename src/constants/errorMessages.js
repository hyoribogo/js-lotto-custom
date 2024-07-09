import { LOTTO } from './lottoValues'

export const ERROR_MESSAGES = Object.freeze({
  INVALID_LOTTO_COUNT: `로또 번호는 ${LOTTO.COUNT}개여야 합니다.`,
  INVALID_LOTTO_NUMBER: `로또 번호는 ${LOTTO.MIN_NUM} ~ ${LOTTO.MAX_NUM} 사이여야 합니다.`,
  ALREADY_WINNING_NUMBER:
    '이미 당첨된 번호는 보너스 번호로 추가할 수 없습니다.',
})
