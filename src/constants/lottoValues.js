const COUNT = 6
const MIN_NUM = 1
const MAX_NUM = 45
const DEFAULT_WINNING_RULES = {
  THREE_MATCH: { matchCount: 3, prize: 5000 },
  FOUR_MATCH: { matchCount: 4, prize: 50000 },
  FIVE_MATCH: { matchCount: 5, prize: 1500000 },
  FIVE_MATCH_WITH_BONUS: { matchCount: 5, bonusMatch: true, prize: 30000000 },
  SIX_MATCH: { matchCount: 6, prize: 2000000000 },
}

export const LOTTO = Object.freeze({
  COUNT,
  MIN_NUM,
  MAX_NUM,
  DEFAULT_WINNING_RULES,
})
