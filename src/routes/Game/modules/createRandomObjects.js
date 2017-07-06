import randomColor from 'randomcolor'

const randomObjects = (boardSize, numberOfItems) => {
  const limit = numberOfItems > 20 ? 20 : numberOfItems
  const itemSize = 30
  let uniqueRandomNumbers = []

  while (uniqueRandomNumbers.length < limit) {
    let randomNumber = Math.floor(Math.random() * 20) * itemSize
    if (uniqueRandomNumbers.indexOf(randomNumber) === -1) {
      uniqueRandomNumbers.push(randomNumber)
    }
  }
  const colors = randomColor({ count:limit })

  return uniqueRandomNumbers.map((number, index) => {
    let randomNumber = Math.floor(Math.random() * 20) * itemSize
    return {
      size: {
        board: boardSize,
        maxDim: boardSize
      },
      positions: {
        player: {
          top: number,
          left: randomNumber
        }
      },
      status: 'inactive',
      color: colors[index]
    }
  })
}
export default randomObjects
