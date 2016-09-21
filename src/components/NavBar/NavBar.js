import React from 'react'
import { IndexLink, Link } from 'react-router'
import './NavBar.scss'

export default class NavBar extends React.Component {

  render () {
    const router = this.context.router
    return (
      <nav className='navbar navbar-default'>
        <div className='navbar-header'>
          <button type='button' className='navbar-toggle collapsed'
            data-toggle='collapse' data-target='#bs-example-navbar-collapse-1'>
            <span className='sr-only'>Toggle navigation</span>
            <span className='icon-bar' />
            <span className='icon-bar' />
            <span className='icon-bar' />
          </button>
          <IndexLink className='navbar-brand' to='/'>Analyze This!</IndexLink>
        </div>

        <div className='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>
          <ul className='nav navbar-nav'>
            <li role='presentation' className={router.isActive('/', true) ? 'active' : ''}>
              <IndexLink to='/'>Home</IndexLink>
            </li>
            <li role='presentation' className={router.isActive('/all', true) ? 'active' : ''}>
              <Link to='/all'>All</Link>
            </li>
            <li role='presentation' className={router.isActive('/category', true) ? 'active' : ''}>
              <Link to='/category'>By Category</Link>
            </li>
            <li role='presentation' className={router.isActive('/merchant', true) ? 'active' : ''}>
              <Link to='/merchant'>By Merchant</Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

NavBar.contextTypes = {
  router: React.PropTypes.any.isRequired
}
