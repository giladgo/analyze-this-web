import React from 'react'
import './TxnList.scss'

import moment from 'moment'

export default class TxnList extends React.Component {

  render () {
    const ChartType = this.props.chartType
    return (
      <div className='row txn-list-container'>
        <div className='col-md-6'>
          <table className='table table-bordered table-hover'>
            <tbody>
              {this.props.transactions.map(txn => (
                <tr key={txn.id}>
                  <td>{moment(txn.txn_date).from(new Date())}</td>
                  <td>{txn.merchant.name}</td>
                  <td>{txn.amount_formatted}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='col-md-6'>
          {(this.props.transactions && !!this.props.transactions.length) &&
            <ChartType data={this.props.chartData} options={this.props.chartOptions} />
          }
        </div>
      </div>
    )
  }
}

TxnList.propTypes = {
  transactions: React.PropTypes.array,
  chartType: React.PropTypes.any,
  chartData: React.PropTypes.any,
  chartOptions: React.PropTypes.any
}
