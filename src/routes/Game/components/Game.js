import React from 'react'
import PropTypes from 'prop-types'
import Player from './Player'

class Game extends React.Component {
  render () {
    return (
      <div>
        {this.props.balls.map((ball, index) => {
          return (
            <Player
              size={30}
              key={index}
              index={index}
              makeActive={this.props.makeBallActive}
              status={ball.status}
              position={ball.positions.player}
              handlePlayerMovement={this.props.moveBall}
              color={ball.color} />
          )
        })}
      </div>
    )
  }
}
Game.propTypes = {
  balls: PropTypes.array,
  makeBallActive: PropTypes.func.isRequired,
  moveBall: PropTypes.func.isRequired,
}

export default Game
