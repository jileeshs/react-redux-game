import { injectReducer } from 'store/reducers'

export default (store) => ({
  path: 'game',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Game = require('./containers/GameContainer').default
      const reducer = require('./modules/game').default
      // const homeReducer = require('../Home/modules/home').default
      /*  Add the reducer to the store on key 'game'  */
      injectReducer(store, { key: 'game', reducer })
      // injectReducer(store, { key: 'home', homeReducer })
      /*  Return getComponent   */
      cb(null, Game)

    /* Webpack named bundle   */
    }, 'game')
  }
})
