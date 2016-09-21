import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'category',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const ByCategory = require('./containers/ByCategoryContainer').default
      const reducer = require('./modules/category').default
      const transcationReducer = require('../../modules/transactions').default

      injectReducer(store, { key: 'categories', reducer })
      injectReducer(store, { key: 'transactions', reducer: transcationReducer })

      /*  Return getComponent   */
      cb(null, ByCategory)

    /* Webpack named bundle   */
    }, 'by_category')
  }
})
