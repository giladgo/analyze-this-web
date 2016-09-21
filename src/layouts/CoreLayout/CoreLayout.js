import React from 'react'
import NavBar from '../../components/NavBar'
import './CoreLayout.scss'
import '../../styles/core.scss'

export const CoreLayout = ({ children }) => (
  <div>
    <NavBar />
    <div className='container'>
      <div className='core-layout__viewport'>
        {children}
      </div>
    </div>
  </div>
)

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired
}

export default CoreLayout
