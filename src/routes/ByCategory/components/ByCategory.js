import React from 'react'

import TxnList from '../../../components/TxnList'

import _ from 'lodash'
import moment from 'moment'

import { Bar as BarGraph, Line as LineGraph } from 'react-chartjs-2'

function daysInMonth (month, year) {
  return new Date(year, month, 0).getDate()
}

function NArray (N) {
  let a = []
  for (let i = 1; i <= N; i++) {
    a.push(i)
  }
  return a
}

export default class ByCategory extends React.Component {

  constructor () {
    super()
    this.handleChange = this.handleChange.bind(this)
    this.state = { selectedMonth: 0 }
  }

  componentDidMount () {
    this.props.onLoad()
  }

  handleChange (e) {
    this.props.onCategoryChange(e.target.value)
  }

  getByMonthData () {
    return _.groupBy(this.props.transactions, txn => moment(txn.txn_date).month())
  }

  getByDayData (month) {
    return _(this.props.transactions)
      .filter(txn => moment(txn.txn_date).month() === month)
      .groupBy(txn => moment(txn.txn_date).date())
      .value()
  }

  componentWillReceiveProps ({ transactions }) {
    if (transactions !== this.props.transactions) {
      this.setState({ selectedMonth: 0 })
    }
  }

  render () {
    const monthNames = moment.monthsShort()

    let chartData
    let chartOptions
    let ChartType
    if (this.state.selectedMonth) {
      ChartType = LineGraph
      let selectedMonth = this.state.selectedMonth * 1
      const days = daysInMonth(new Date().getYear(), selectedMonth + 1)
      const byDay = this.getByDayData(selectedMonth)
      const sumByDay = _.mapValues(byDay, day => _.sumBy(day, t => t.amount / 100))
      const data = NArray(days).map(d => sumByDay[d])
      chartData = {
        labels: NArray(days),
        datasets: [
          {
            data,
            borderColor: 'rgba(75,192,192,1)',
            backgroundColor: 'rgba(75,192,192,0.4)',
            spanGaps: true
          }
        ]
      }
      chartOptions = {
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
    } else {
      const byMonth = this.getByMonthData()
      const data = _(byMonth).values().map((month) => _.sumBy(month, t => t.amount / 100)).value()
      ChartType = BarGraph
      chartData = {
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

      chartOptions = {
        onClick: (event, items) => {
          if (items[0]) {
            const selectedMonth = Object.keys(this.getByMonthData())[items[0]._index]
            this.setState({ selectedMonth })
          }
        },
        legend: {
          display: false
        },
        scales: {
          yAxes: [
            { type: 'logarithmic',
            ticks: {
              min: 1,
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
    }

    return (<div>
      <div className='form-group'>
        <label htmlFor='select-category'>Category</label>
        <select className='form-control' id='select-category' onChange={this.handleChange}>
          {this.props.categories.map((category, index) =>
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          )}
        </select>

        <TxnList transactions={this.props.transactions}
          chartType={ChartType} chartData={chartData} chartOptions={chartOptions} />
      </div>
    </div>)
  }
}

ByCategory.propTypes = {
  categories: React.PropTypes.array,
  onLoad: React.PropTypes.func,
  onCategoryChange: React.PropTypes.func,
  transactions: React.PropTypes.any
}
