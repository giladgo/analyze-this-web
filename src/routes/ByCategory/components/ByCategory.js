import React from 'react'

import TxnList from '../../../components/TxnList'

export default class ByCategory extends React.Component {

  constructor () {
    super()
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount () {
    this.props.onLoad()
  }

  handleChange (e) {
    this.props.onCategoryChange(e.target.value)
  }

  render () {
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

        <TxnList />
      </div>
    </div>)
  }
}

ByCategory.propTypes = {
  categories: React.PropTypes.array,
  onLoad: React.PropTypes.func,
  onCategoryChange: React.PropTypes.func
}
