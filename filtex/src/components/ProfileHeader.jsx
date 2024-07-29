// eslint-disable-next-line no-unused-vars
import React from 'react'
import { BiEdit} from 'react-icons/bi'


const ProfileHeader = () => {
  return (
    <div className='profile-header'>
      <h2 className='header-title'>Docs</h2>
        <div className='edit'>
            <BiEdit className='icons' />
        </div>
    </div>
  )
}

export default ProfileHeader
