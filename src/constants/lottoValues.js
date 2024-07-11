const COUNT = 6
const MIN_NUM = 1
const MAX_NUM = 45
const PRICE = 1000
const DEFAULT_WINNING_RULES = [
  { value: 3, prize: 5000, bonus: false },
  { value: 4, prize: 50000, bonus: false },
  { value: 5, prize: 1500000, bonus: false },
  { value: 5, prize: 30000000, bonus: true },
  { value: 6, prize: 2000000000, bonus: false },
]

export const LOTTO = Object.freeze({
  COUNT,
  MIN_NUM,
  MAX_NUM,
  PRICE,
  DEFAULT_WINNING_RULES,
})
