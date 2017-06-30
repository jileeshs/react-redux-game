import { randomObjects } from './createRandomObjects'
// ------------------------------------
// Constants
// ------------------------------------
export const MOVE_BALL = 'MOVE_BALL'
export const MAKE_ACTIVE = 'MAKE_ACTIVE'
export const CREATE_OBJECTS = 'CREATE_OBJECTS'

const BOARD_SIZE = 600
const BALL_DIMENSION = 30
const SPEED = 10

// ------------------------------------
// Actions
// ------------------------------------
export function moveItem (direction) {
  return {
    type: MOVE_BALL,
    payload: direction
  }
}

export function makeItemActive (index) {
  return {
    type: MAKE_ACTIVE,
    payload: index
  }
}
export function createObjects (numberOfObjects) {
  return {
    type: CREATE_OBJECTS,
    payload: numberOfObjects
  }
}

export const actions = {
  moveItem,
  makeItemActive,
  createObjects
}
const getDefaultState = ({ boardSize = 600 }, numberOfObjects) => {
  return randomObjects(600, Number(numberOfObjects))
}
const collideTop = (top, left, state) => {
  return state.items.filter(item => item.inedex !== state.activeItem)
          .filter(item => (item.positions.player.left - BALL_DIMENSION < left) ===
          (left < item.positions.player.left + BALL_DIMENSION))
          .some(item => (item.positions.player.top + BALL_DIMENSION) === top)
}
const collideBottom = (top, left, state) => {
  return state.items.filter(item => item.inedex !== state.activeItem)
          .filter(item => (item.positions.player.left - BALL_DIMENSION < left) ===
          (left < item.positions.player.left + BALL_DIMENSION))
          .some(item => (item.positions.player.top - BALL_DIMENSION) === top)
}
const collideLeft = (top, left, state) => {
  return state.items.filter(item => item.inedex !== state.activeItem)
          .filter(item => (item.positions.player.top - BALL_DIMENSION < top) ===
          (top < item.positions.player.top + BALL_DIMENSION))
            .some(item => (item.positions.player.left + BALL_DIMENSION) === left)
}
const collideRight = (top, left, state) => {
  return state.items.filter(item => item.inedex !== state.activeItem)
          .filter(item => (item.positions.player.top - BALL_DIMENSION < top) ===
          (top < item.positions.player.top + BALL_DIMENSION))
            .some(item => (item.positions.player.left - BALL_DIMENSION) === left)
}
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [MOVE_BALL]: (state, action) => {
    const { top, left } = state.items[state.activeItem].positions.player
    let collision = false
    switch (action.payload.dir) {
      case 'UP':
        if (top <= SPEED || collideTop(top, left, state)) { collision = true }
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
    if (!collision) {
      return {
        ...state,
        items: state.items.map((item, index) => index === state.activeItem
          ? { ...item,
            status: 'active',
            positions: { player: {
              top: item.positions.player.top + (SPEED * action.payload.top),
              left: item.positions.player.left + (SPEED * action.payload.left)
            } } } : item)
      }
    } else {
      return {
        ...state,
        items: state.items.map((item, index) => index === state.activeItem
        ? { ...item, status: 'collided' } : { ...item, status: 'inactive' })
      }
    }
  },
  [MAKE_ACTIVE]: (state, action) => {
    return {
      ...state,
      previousItem: state.activeItem,
      items: state.items.map((item, index) => index === action.payload
        ? { ...item, status: 'active' } : { ...item, status: 'inactive' }),
      activeItem: action.payload
    }
  },
  [CREATE_OBJECTS]: (state, action) => {
    return {
      ...state,
      activeItem: null,
      previousItem: null,
      items: getDefaultState({}, action.payload)
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  items: [],
  activeItem: null,
  previousItem: null
}
export default function gameReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
