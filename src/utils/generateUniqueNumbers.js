import getRandomNumber from './getRandomNumber.js'

const generateUniqueNumbers = (amount, min, max, numsSet = new Set()) => {
  if (numsSet.size >= amount) {
    return Array.from(numsSet)
  }

  const newNum = getRandomNumber(min, max)

  return generateUniqueNumbers(amount, min, max, numsSet.add(newNum))
}

export default generateUniqueNumbers
