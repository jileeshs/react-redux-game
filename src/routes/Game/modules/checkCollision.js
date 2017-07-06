const ITEM_DIMENSION = 30

export const collideVertical = (top, left, state, direction) => {
  return state.items.filter(item => item.inedex !== state.activeItem)
        .filter(item => (item.positions.player.left - ITEM_DIMENSION < left) ===
        (left < item.positions.player.left + ITEM_DIMENSION))
        .some(item => (item.positions.player.top + ITEM_DIMENSION * direction) === top)
}

export const collideHorizontal = (top, left, state, direction) => {
  return state.items.filter(item => item.inedex !== state.activeItem)
        .filter(item => (item.positions.player.top - ITEM_DIMENSION < top) ===
        (top < item.positions.player.top + ITEM_DIMENSION))
          .some(item => (item.positions.player.left + ITEM_DIMENSION * direction) === left)
}
