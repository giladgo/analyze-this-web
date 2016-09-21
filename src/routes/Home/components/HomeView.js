import _ from 'lodash'
import React from 'react'
import './HomeView.scss'

import { Doughnut } from 'react-chartjs-2'

export const HomeView = React.createClass({
  propTypes: {
    transactions: React.PropTypes.any,
    onLoad: React.PropTypes.func
  },

  componentDidMount () {
    this.props.onLoad()
  },

  render () {
    const byCategory = _(this.props.transactions).groupBy(txn => txn.merchant.category.id).value()
    const sumsByCategory = _(byCategory).mapValues(txns => _.sumBy(txns, txn => txn.amount / 100)).value()
    const categoryLabels = Object.keys(byCategory).map(id => {
      return _.find(this.props.transactions, txn => txn.merchant.category.id === id * 1).merchant.category.name
    })

    const chartData = {
      labels: categoryLabels,
      datasets: [
        {
          data: _.values(sumsByCategory),
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
          ],
          hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
          ]
        }]
    }

    const chartOptions = {

    }

    return (<div>
      <h1>Spending Overview</h1>
      <Doughnut data={chartData} options={chartOptions} />
    </div>)
  }
})

export default HomeView
