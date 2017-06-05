// ------------------------------------
// Constants
// ------------------------------------
export const MOVE_BALL = 'MOVE_BALL'
export const MAKE_ACTIVE = 'MAKE_ACTIVE'
export const COUNTER_DOUBLE_ASYNC = 'COUNTER_DOUBLE_ASYNC'

// ------------------------------------
// Actions
// ------------------------------------
export function moveBall (direction) {
  return {
    type: MOVE_BALL,
    payload: direction
  }
}

export function makeBallActive (index) {
  return {
    type: MAKE_ACTIVE,
    payload: index
  }
}
/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

export const doubleAsync = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch({
          type: COUNTER_DOUBLE_ASYNC,
          payload: getState().counter
        })
        resolve()
      }, 200)
    })
  }
}

export const actions = {
  moveBall,
  makeBallActive,
  doubleAsync
}
const getDefaultState = ({ boardSize = 600 }) => {
  let limit = 10
  let amount = 10
  let lowerBound = 1
  let upperBound = boardSize-25
  let uniqueRandomNumbers = []

  if (amount > limit) {
    limit = amount
  }
  while (uniqueRandomNumbers.length < limit) {
    let randomNumber = Math.round(Math.random() * (upperBound - lowerBound) + lowerBound)
    randomNumber = Math.ceil(randomNumber / 5) * 5
    if (uniqueRandomNumbers.indexOf(randomNumber) === -1) {
      uniqueRandomNumbers.push(randomNumber)
    }
  }
  let colors = ['aqua', 'black', 'blue', 'fuchsia', 'gray', 'green',
    'lime', 'maroon', 'navy', 'olive', 'orange', 'purple', 'red',
    'silver', 'teal', 'white', 'yellow']
  return uniqueRandomNumbers.map((number, index) => {
    let randomNumber = Math.round(Math.random() * (upperBound - lowerBound) + lowerBound)
    randomNumber = Math.ceil(randomNumber / 5) * 5
    return {
      size: {
        board: boardSize,
        maxDim: boardSize
      },
      positions: {
        player: {
          top: number,
          left: randomNumber
        },
        enemies: []
      },
      playerScore: 0,
      timeElapsed: 0,
      status: 'inactive',
      color: colors[index]
    }
  })
}
const checkForTop = (top, left, state) => {
  return state.balls.filter(ball => ball.inedex !== state.activeBall)
          .filter(ball => (ball.positions.player.left - 25 < left) === (left < ball.positions.player.left + 25))
          .some(ball => (ball.positions.player.top + 25) === top)
}
const checkForBottom = (top, left, state) => {
  return state.balls.filter(ball => ball.inedex !== state.activeBall)
          .filter(ball => (ball.positions.player.left - 25 < left) === (left < ball.positions.player.left + 25))
          .some(ball => (ball.positions.player.top - 25) === top)
}
const checkForLeft = (top, left, state) => {
  return state.balls.filter(ball => ball.inedex !== state.activeBall)
          .filter(ball => (ball.positions.player.top - 25 < top) === (top < ball.positions.player.top + 25))
            .some(ball => (ball.positions.player.left + 25) === left)
}
const checkForRight = (top, left, state) => {
  return state.balls.filter(ball => ball.inedex !== state.activeBall)
          .filter(ball => (ball.positions.player.top - 25 < top) === (top < ball.positions.player.top + 25))
            .some(ball => (ball.positions.player.left - 25) === left)
}
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [MOVE_BALL]: (state, action) => {
    const { top, left } = state.balls[state.activeBall].positions.player
    switch (action.payload.dir) {
      case 'UP':
        if (top <= 0) return state
        else if (checkForTop(top, left, state)) {
          return state
        }
        break
      case 'DOWN':
        if (top >= 600 - 25) return state
        else if (checkForBottom(top, left, state)) {
          return state
        }
        break
      case 'LEFT':
        if (left <= 0) return state
        else if (checkForLeft(top, left, state)) {
          return state
        }
        break
      case 'RIGHT':
        if (left >= 600 - 25) return state
        else if (checkForRight(top, left, state)) {
          return state
        }
        break
    }
    return {
      ...state,
      balls: state.balls.map((ball, index) => index === state.activeBall
        ? { ...ball,
          positions: { player: {
            top: ball.positions.player.top + (5 * action.payload.top),
            left: ball.positions.player.left + (5 * action.payload.left)
          } } } : ball)
    }
  },
  [MAKE_ACTIVE]: (state, action) => {
    return {
      ...state,
      previousBall: state.activeBall,
      balls: state.balls.map((ball, index) => index === action.payload
        ? { ...ball, status: 'active' } : { ...ball, status: 'inactive' }),
      activeBall: action.payload
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  balls: getDefaultState(600, 1),
  activeBall: null,
  previousBall: null
}
export default function gameReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
