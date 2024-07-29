// eslint-disable-next-line no-unused-vars
import React from 'react'
import Sidebar from './Sidebar'
import Content from './Content'
import Profile from './Profile'

const Dashboard = () => {
  return (
    <div className='dashboard'>
    <Sidebar />
    <div className="dashboard-content">
      <Content />
      <Profile />
      {/* <Results /> */}
    </div>
    </div>
  )
}

export default Dashboard
