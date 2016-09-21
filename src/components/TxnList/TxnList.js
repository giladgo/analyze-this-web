import _ from 'lodash'
import React from 'react'
import './TxnList.scss'

import moment from 'moment'

import { Bar as BarGraph } from 'react-chartjs-2'

export default class TxnList extends React.Component {

  render () {
    const monthNames = moment.monthsShort()
    const byMonth = _.groupBy(this.props.transactions, txn => moment(txn.txn_date).month())
    const data = _(byMonth).values().map((month) => _.sumBy(month, t => t.amount / 100)).value()
    const monthBarData = {
      labels: Object.keys(byMonth).map(m => monthNames[m]),
      datasets: [
        {
          data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }
      ]
    }

    const chartOptions = {
      legend: {
        display: false
      },
      scales: {
        yAxes: [
          { type: 'logarithmic',
          ticks: {
            callback: (value, index, values) => {
              if (value.toString().startsWith('1')) {
                return value
              } else {
                return null
              }
            }
          }
        }]
      }
    }

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
            <BarGraph data={monthBarData} options={chartOptions} />
          }
        </div>
      </div>
    )
  }
}

TxnList.propTypes = {
  transactions: React.PropTypes.array
}
