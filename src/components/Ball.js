
import React from 'react'
import PropTypes from 'prop-types'

const style = ({ size, position, color, status }) => {
  const dim = size + 'px'
  let border = 'none'
  if (status === 'active') {
    border = '2px solid red'
  }
  return {
    width: dim,
    height: dim,
    backgroundColor: color,
    border: border,
    position: 'absolute',
    borderRadius: size / 2 + 'px',
    top: position.top + 'px',
    left: position.left + 'px',
    transition: 'all 0.1s ease',
    cursor: 'pointer'
  }
}

class Ball extends React.Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick () {
    this.props.makeActive(this.props.index)
  }
  render () {
    return (
      <div onClick={this.handleClick} style={style(this.props)} />
    )
  }
}

const { func, number } = PropTypes
Ball.propTypes = {
  index: number,
  makeActive: func
}
export default Ball
