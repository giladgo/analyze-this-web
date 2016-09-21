import _ from 'lodash'
import moment from 'moment'
import React from 'react'

import TxnList from '../../../components/TxnList'
import { Line as LineGraph } from 'react-chartjs-2'

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
    const labels = _(this.props.transactions).map(txn => moment(txn.txn_date).format('l')).value()
    const data = _(this.props.transactions).map(txn => txn.amount / 100).value()
    let chartData = {
      labels,
      datasets: [
        {
          data,
          borderColor: 'rgba(75,192,192,1)',
          backgroundColor: 'rgba(75,192,192,0.4)',
          spanGaps: true
        }
      ]
    }
    let chartOptions = {
      legend: {
        display: false
      },
      scales: {
        yAxes: [
          { type: 'linear',
          ticks: {
            min: 0
          }
        }]
      }
    }

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

        <TxnList transactions={this.props.transactions}
          chartType={LineGraph} chartData={chartData} chartOptions={chartOptions} />
      </div>
    </div>)
  }
}

ByMerchant.propTypes = {
  merchants: React.PropTypes.array,
  onLoad: React.PropTypes.func,
  onMerchantChange: React.PropTypes.func,
  transactions: React.PropTypes.any
}
