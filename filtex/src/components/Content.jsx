// eslint-disable-next-line no-unused-vars
import React from 'react'
// import ContentHeader from './ContentHeader'
import "../styles/content.css"
import Upload from './Uploader'
// import Card from './Card'
import Hero from './Hero'

const Content = () => {
  return (
    <div className="content">
      {/* <ContentHeader /> */}
      <Hero />
      {/* <Card /> */}
      <Upload />
      {/* <TeacherList /> */}
    </div>
  )
}

export default Content
