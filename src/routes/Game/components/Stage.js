import React from 'react'
import PropTypes from 'prop-types'
import Item from 'components/Item'
class Stage extends React.Component {
  static propTypes = {
    size: PropTypes.number,
    makeActive: PropTypes.func,
    handlePlayerMovement: PropTypes.func,
    status: PropTypes.string,
    color: PropTypes.string,
    index: PropTypes.number,
    position: PropTypes.shape({
      top: PropTypes.number,
      left: PropTypes.number
    })
  }
  handleKeyDown = (e) => {
    let newDirection
    switch (e.keyCode) {
      case 37:
        newDirection = { top: 0, left: 1, dir: 'LEFT' }
        break
      case 38:
        newDirection = { top: 1, left: 0, dir: 'UP' }
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
      <Item
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

export default Stage
