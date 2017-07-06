import React from 'react'
import PropTypes from 'prop-types'
import Stage from './Stage'
import { goToPage } from '../../../util'
import './Game.scss'

class Game extends React.Component {
  static propTypes = {
    items: PropTypes.array,
    makeItemActive: PropTypes.func.isRequired,
    moveItem: PropTypes.func.isRequired,
    numberOfItems: PropTypes.number,
    createObjects: PropTypes.func
  }
  constructor () {
    super()
    this.state = {
      infoVisible: false
    }
    this.showHowTo = this.showHowTo.bind(this)
  }
  componentDidMount () {
    if (this.props.numberOfItems < 1) {
      goToPage('/')
    } else {
      if (this.props.items && Number(this.props.numberOfItems) !== this.props.items.length) {
        this.props.createObjects(this.props.numberOfItems)
      }
    }
  }
  showHowTo () {
    this.setState({
      infoVisible: !this.state.infoVisible
    })
  }
  hideHowTo () {
    this.setState({
      infoVisible: false
    })
  }
  render () {
    return (
      <div>
        <span className='show-how' onClick={this.showHowTo}>?</span>
        {this.state.infoVisible
          ? <div className='how-to-play callout bottom-right'>
            <div>
                Click on an object to activate it.
                Use arrow keys to navigate
            </div>
            <section className='arrow-container'>
              <i className='arrow right' />
              <i className='arrow up' />
              <i className='arrow down' />
              <i className='arrow left' />
            </section>
          </div>
          : ''
        }

        {this.props.numberOfItems > 0 ? this.props.items.map((item, index) => {
          return (
            <Stage
              size={30}
              key={index}
              index={index}
              makeActive={this.props.makeItemActive}
              status={item.status}
              position={item.positions.player}
              handlePlayerMovement={this.props.moveItem}
              color={item.color} />
          )
        }) : 'null' }
      </div>
    )
  }
}

export default Game
