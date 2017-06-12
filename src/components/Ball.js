
import React from 'react'
import PropTypes from 'prop-types'
import './Ball.scss'

const style = ({ size, position, color, status }) => {
  const dim = size + 'px'
  let border = 'none'
  let boxShadow = 'none'
  if (status === 'active') {
    border = '2px solid red'
  } else if (status === 'collided') {
    border = '2px solid black'
    // boxShadow =  '0 5px 15px rgba(0, 0, 0, 0.3)'
  }

  return {
    width: dim,
    height: dim,
    backgroundColor: color,
    border: border,
    position: 'absolute',
    borderRadius: size / 8 + 'px',
    top: position.top + 'px',
    left: position.left + 'px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    boxShadow: boxShadow
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
    let myClassName = ''
    if (this.props.status === 'collided') {
      myClassName = 'element'
    }
    return (
      <div onClick={this.handleClick} style={style(this.props)} className={myClassName} />
    )
  }
}

const { func, number, string } = PropTypes
Ball.propTypes = {
  index: number,
  makeActive: func,
  status: string
}
export default Ball
