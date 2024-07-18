// eslint-disable-next-line no-unused-vars
import React from 'react'
import ContentHeader from './ContentHeader'
import "../styles/content.css"
import Card from './Card'
import Hero from './Hero'
import Upload from './Upload'
const Content = () => {
  return (
    <div className="content">
      {/* <ContentHeader /> */}
      <Hero />
      <Card />
      <Upload />
      {/* <TeacherList /> */}
    </div>
  )
}

export default Content
