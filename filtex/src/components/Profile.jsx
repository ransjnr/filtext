// eslint-disable-next-line no-unused-vars
import React from 'react'
import ProfileHeader from './ProfileHeader'
import '../styles/profile.css'
import '../styles/teacherList.css'
import { BiBook } from 'react-icons/bi'

const courses = [
  {
    title: 'English',
    duration: '2 hours',
    icon: <BiBook />
  },
  {
    title: 'English',
    duration: '2 hours',
    icon: <BiBook />
  },
  {
    title: 'English',
    duration: '2 hours',
    icon: <BiBook />
  },
  {
    title: 'English',
    duration: '2 hours',
    icon: <BiBook />
  },
  {
    title: 'English',
    duration: '2 hours',
    icon: <BiBook />
  },
  {
    title: 'English',
    duration: '2 hours',
    icon: <BiBook />
  },

  
  
  

]
const Profile = () => {
  return (
    <div className='profile'>
      <ProfileHeader />
      <div className='user-profile'>
        <div className='user-courses'>
           {courses.map((courses)=> (
            // eslint-disable-next-line react/jsx-key
            <div className='course'>
              <div className='course-detail'>
                <div className='course-cover'>{courses.icon}</div>
                <div className='course-name'>
                  <h5 className='title'>{courses.title}</h5>
                </div>
              </div>
               <div className='action'>:</div>
            </div>
            
           ))}
        </div>
      </div>
    </div>
  )
}

export default Profile
