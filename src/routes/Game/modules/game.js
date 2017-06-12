import randomColor from 'randomcolor'

// ------------------------------------
// Constants
// ------------------------------------
export const MOVE_BALL = 'MOVE_BALL'
export const MAKE_ACTIVE = 'MAKE_ACTIVE'
export const COUNTER_DOUBLE_ASYNC = 'COUNTER_DOUBLE_ASYNC'

const BOARD_SIZE = 600
const BALL_DIMENSION = 30
const SPEED = 10

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


export const actions = {
  moveBall,
  makeBallActive
}
const getDefaultState = ({ boardSize = 600 }) => {
  let limit = 20
  let amount = 10
  let lowerBound = 1
  let upperBound = boardSize - 30
  let uniqueRandomNumbers = []

  if (amount > limit) {
    limit = amount
  }
  while (uniqueRandomNumbers.length < limit) {
    // let randomNumber = Math.round(Math.random() * (upperBound - lowerBound) + lowerBound)
    let randomNumber  = Math.floor(Math.random() * 20) * 30 + lowerBound;
    // randomNumber = Math.ceil(randomNumber / 10) * 10
    if (uniqueRandomNumbers.indexOf(randomNumber) === -1) {
      uniqueRandomNumbers.push(randomNumber)
    }
  }
  let colors = randomColor({count:limit})

  return uniqueRandomNumbers.map((number, index) => {
    // let randomNumber = Math.round(Math.random() * (upperBound - lowerBound) + lowerBound)
    let randomNumber = Math.floor(Math.random() * 20) * 30 + lowerBound;
    // randomNumber = Math.ceil(randomNumber / 10) * 10
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
const collideTop = (top, left, state) => {
  return status =  state.balls.filter(ball => ball.inedex !== state.activeBall)
          .filter(ball => (ball.positions.player.left - BALL_DIMENSION < left) === (left < ball.positions.player.left + BALL_DIMENSION))
          .some(ball => (ball.positions.player.top + BALL_DIMENSION) === top)

}
const collideBottom = (top, left, state) => {
  return state.balls.filter(ball => ball.inedex !== state.activeBall)
          .filter(ball => (ball.positions.player.left - BALL_DIMENSION < left) === (left < ball.positions.player.left + BALL_DIMENSION))
          .some(ball => (ball.positions.player.top - BALL_DIMENSION) === top)
}
const collideLeft = (top, left, state) => {
  return state.balls.filter(ball => ball.inedex !== state.activeBall)
          .filter(ball => (ball.positions.player.top - BALL_DIMENSION < top) === (top < ball.positions.player.top + BALL_DIMENSION))
            .some(ball => (ball.positions.player.left + BALL_DIMENSION) === left)
}
const collideRight = (top, left, state) => {
  return state.balls.filter(ball => ball.inedex !== state.activeBall)
          .filter(ball => (ball.positions.player.top - BALL_DIMENSION < top) === (top < ball.positions.player.top + BALL_DIMENSION))
            .some(ball => (ball.positions.player.left - BALL_DIMENSION) === left)
}
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [MOVE_BALL]: (state, action) => {
    const { top, left } = state.balls[state.activeBall].positions.player
    let collision = false
    switch (action.payload.dir) {
      case 'UP':
        if (top <= SPEED ||  collideTop(top, left, state))
          collision = true
        break
      case 'DOWN':
        if (top >= BOARD_SIZE - BALL_DIMENSION || collideBottom(top, left, state)) {
          collision = true
        }
        break
      case 'LEFT':
        if (left <= SPEED || collideLeft(top, left, state)) {
          collision = true
        }
        break
      case 'RIGHT':
        if (left >= BOARD_SIZE - BALL_DIMENSION || collideRight(top, left, state)) {
          collision = true
        }
        break
      default:
        return state
    }
    if(!collision) {
      return {
        ...state,
        balls: state.balls.map((ball, index) => index === state.activeBall
          ? { ...ball,
            status: 'active',
            positions: { player: {
              top: ball.positions.player.top + (SPEED * action.payload.top),
              left: ball.positions.player.left + (SPEED * action.payload.left)
            } } } : ball)
      }
    }else {
      return {
      ...state,
      balls: state.balls.map((ball, index) => index === state.activeBall
        ? { ...ball, status: 'collided' } : { ...ball, status: 'inactive' })
      }
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
  balls: getDefaultState(BOARD_SIZE, 1),
  activeBall: null,
  previousBall: null
}
export default function gameReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
