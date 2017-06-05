import React, { Component, PropTypes } from 'react'
import Ball from 'components/Ball'

class Player extends Component {
  handleKeyDown = (e) => {
    let newDirection
    switch (e.keyCode) {
      case 37:
        newDirection = { top: 0, left: -1, dir: 'LEFT' }
        break
      case 38:
        newDirection = { top: -1, left: 0, dir: 'UP' }
        break
      case 39:
        newDirection = { top: 0, left: 1, dir: 'RIGHT' }
        break
      case 40:
        newDirection = { top: 1, left: 0, dir: 'DOWN' }
        break
      default:
        return
    }
    this.props.handlePlayerMovement(newDirection)
  }

  render () {
    const { size, position: { top, left }, color } = this.props
    return (
      <Ball
        index={this.props.index}
        size={size}
        position={{ top, left }}
        color={color}
        status={this.props.status}
        makeActive={this.props.makeActive} />
    )
  }

  componentDidMount () {
    window.onkeydown = this.handleKeyDown
  }
}

Player.propTypes = {
  size: PropTypes.number,
  makeActive: PropTypes.func,
  handlePlayerMovement: PropTypes.func,
  status: PropTypes.string,
  color: PropTypes.string,
  index: PropTypes.index,
  position: PropTypes.shape({
    top: PropTypes.number,
    left: PropTypes.number
  })
}

export default Player
