const COUNT = 6
const MIN_NUM = 1
const MAX_NUM = 45
const PRICE = 1000
const DEFAULT_WINNING_RULES = {
  THREE_MATCH: { value: 3, prize: 5000 },
  FOUR_MATCH: { value: 4, prize: 50000 },
  FIVE_MATCH: { value: 5, prize: 1500000 },
  FIVE_MATCH_WITH_BONUS: { value: 5, bonus: true, prize: 30000000 },
  SIX_MATCH: { value: 6, prize: 2000000000 },
}

export const LOTTO = Object.freeze({
  COUNT,
  MIN_NUM,
  MAX_NUM,
  PRICE,
  DEFAULT_WINNING_RULES,
})
