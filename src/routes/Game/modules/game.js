import randomObjects from './createRandomObjects'
import { collideHorizontal, collideVertical } from './checkCollision'
// ------------------------------------
// Constants
// ------------------------------------
export const MOVE_ITEM = 'MOVE_ITEM'
export const MAKE_ACTIVE = 'MAKE_ACTIVE'
export const CREATE_ITEMS = 'CREATE_ITEMS'

const BOARD_SIZE = 600
const ITEM_DIMENSION = 30
const SPEED = 10

// ------------------------------------
// Actions
// ------------------------------------
export function moveItem (direction) {
  return {
    type: MOVE_ITEM,
    payload: direction
  }
}

export function makeItemActive (index) {
  return {
    type: MAKE_ACTIVE,
    payload: index
  }
}

export function createObjects (numberOfItems) {
  return {
    type: CREATE_ITEMS,
    payload: numberOfItems
  }
}

export const actions = {
  moveItem,
  makeItemActive,
  createObjects
}

const getDefaultState = ({ boardSize = 600 }, numberOfItems) => {
  return randomObjects(600, Number(numberOfItems))
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [MOVE_ITEM]: (state, action) => {
    const { top, left } = state.items[state.activeItem].positions.player
    let direction = 1
    let collision = false
    switch (action.payload.dir) {
      case 'UP':
        direction = -1
        if (top <= 0 || collideVertical(top, left, state, 1)) {
          collision = true
        }
        break
      case 'DOWN':
        direction = 1
        if (top >= BOARD_SIZE - ITEM_DIMENSION || collideVertical(top, left, state, -1)) {
          collision = true
        }
        break
      case 'LEFT':
        direction = -1
        if (left <= 0 || collideHorizontal(top, left, state, 1)) {
          collision = true
        }
        break
      case 'RIGHT':
        direction = 1
        if (left >= BOARD_SIZE - ITEM_DIMENSION || collideHorizontal(top, left, state, -1)) {
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
              top: item.positions.player.top + (SPEED * action.payload.top * direction),
              left: item.positions.player.left + (SPEED * action.payload.left * direction)
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
  [CREATE_ITEMS]: (state, action) => {
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
