import React from 'react'
import PropTypes from 'prop-types'
import Stage from './Stage'
import { goToPage } from '../../../util'

class Game extends React.Component {

  componentDidMount () {
    if (this.props.numberOfObjects < 1) {
      goToPage('/')
    } else {
      if (this.props.balls && Number(this.props.numberOfObjects) !== this.props.balls.length) { this.props.createObjects(this.props.numberOfObjects) }
    }
  }

  render () {
    return (
      <div>
        {this.props.numberOfObjects > 0 ? this.props.balls.map((ball, index) => {
          return (
            <Stage
              size={30}
              key={index}
              index={index}
              makeActive={this.props.makeBallActive}
              status={ball.status}
              position={ball.positions.player}
              handlePlayerMovement={this.props.moveBall}
              color={ball.color} />
          )
        }) : 'null' }
      </div>
    )
  }
}
Game.propTypes = {
  balls: PropTypes.array,
  makeBallActive: PropTypes.func.isRequired,
  moveBall: PropTypes.func.isRequired,
  numberOfObjects: PropTypes.string,
  createObjects: PropTypes.func
}

export default Game
