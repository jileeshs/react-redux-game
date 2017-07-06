import React from 'react'
import PropTypes from 'prop-types'
import { goToPage } from '../../../util'
import './HomeView.scss'

class Home extends React.Component {
  static propTypes = {
    numberOfItems: PropTypes.number,
    setNumberOfItems: PropTypes.func.isRequired
  }
  constructor () {
    super()
    this.state = {
      numberOfItems: 1
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange (event) {
    this.setState({ numberOfItems: event.target.value })
  }
  handleSubmit (event) {
    this.props.setNumberOfItems(this.state.numberOfItems)
    goToPage('game')
    event.preventDefault()
  }
  componentDidMount () {
    this.setState({ numberOfItems: this.props.numberOfItems })
  }
  render () {
    return (
      <div className='home-bg'>
        <form onSubmit={this.handleSubmit}>
          <section className='home-info'>
            <label> <span>Select Number of items</span>
              <input
                className='number-input'
                type='number'
                min='1'
                max='20'
                value={this.state.numberOfItems}
                onChange={this.handleChange} />
            </label>
            <input className='button-input' type='submit' value='Submit' onClick={this.props.setNumberOfItems} />
          </section>
        </form>
      </div>
    )
  }
}

export default Home
