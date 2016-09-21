import React from 'react'
import DeNiro from '../assets/deniro.gif'
import './HomeView.scss'

export const HomeView = () => (
  <div>
    <h1>Analyze This!</h1>
    <img
      alt='You!'
      className='deniro'
      src={DeNiro} />
  </div>
)

export default HomeView
