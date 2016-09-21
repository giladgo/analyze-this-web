import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'merchant',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const ByMerchant = require('./containers/ByMerchantContainer').default
      const reducer = require('./modules/merchant').default
      const transcationReducer = require('../../modules/transactions').default

      injectReducer(store, { key: 'merchants', reducer })
      injectReducer(store, { key: 'transactions', reducer: transcationReducer })

      /*  Return getComponent   */
      cb(null, ByMerchant)

    /* Webpack named bundle   */
    }, 'by_merchant')
  }
})
