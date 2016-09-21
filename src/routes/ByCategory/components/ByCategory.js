import React from 'react'

export default class ByCategory extends React.Component {
  componentDidMount () {
    this.props.onLoad()
  }

  render () {
    return (<div>
      <div className='form-group'>
        <label htmlFor='select-category'>Category</label>
        <select className='form-control' id='select-category'>
          {this.props.categories.map((category, index) => <option key={index}>{category.name}</option>)}
        </select>
      </div>
    </div>)
  }
}

ByCategory.propTypes = {
  categories: React.PropTypes.array,
  onLoad: React.PropTypes.func
}
