// ------------------------------------
// Constants
// ------------------------------------
export const SET_NUMBER_OF_ITEMS = 'SET_NUMBER_OF_ITEMS'

// ------------------------------------
// Actions
// ------------------------------------

export function setNumberOfItems (numberOfItems) {
  return {
    type: SET_NUMBER_OF_ITEMS,
    payload: Number(numberOfItems)
  }
}

export const actions = {
  setNumberOfItems
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_NUMBER_OF_ITEMS]: (state, action) => {
    return {
      ...state,
      numberOfItems: action.payload
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  numberOfItems: 1
}
export default function homeReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
