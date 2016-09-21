import React from 'react'

import TxnList from '../../../components/TxnList'

export default class ByMerchant extends React.Component {

  constructor () {
    super()
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount () {
    this.props.onLoad()
  }

  handleChange (e) {
    this.props.onMerchantChange(e.target.value)
  }

  render () {
    return (<div>
      <div className='form-group'>
        <label htmlFor='select-merchant'>Merchant</label>
        <select className='form-control' id='select-merchant' onChange={this.handleChange}>
          {this.props.merchants.map((merchant, index) =>
            <option key={merchant.id} value={merchant.id}>
              {merchant.name}
            </option>
          )}
        </select>

        <TxnList />
      </div>
    </div>)
  }
}

ByMerchant.propTypes = {
  merchants: React.PropTypes.array,
  onLoad: React.PropTypes.func,
  onMerchantChange: React.PropTypes.func
}
