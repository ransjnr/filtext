// eslint-disable-next-line no-unused-vars
import React from 'react'
import "../styles/teacherList.css"
import Image1 from  '../assets/image.jpg'

const teachers = [
    {
        image: Image1,
        name: 'Prof. Jhone Doe',
        duration: '20hours lesson',
        cost: '100',
    },
    {
        image: Image1,
        name: 'Prof. Jhone Doe',
        duration: '20hours lesson',
        cost: '100',
    },
    {
        image: Image1,
        name: 'Prof. Jhone Doe',
        duration: '20hours lesson',
        cost: '100',
    },
    {
        image: Image1,
        name: 'Prof. Jhone Doe',
        duration: '20hours lesson',
        cost: '100',
    }
]

const TeacherList = () => {
  return (
    <div className='teacher-list'>
      <div className='list-header'>
        <h2>Teachers</h2>
        <select>
            <option value="english">English</option>
            <option value="hindi">hindi</option>
        </select>
      </div>
      <div className='list-container'>
        {teachers.map((teacher) => (
        // eslint-disable-next-line react/jsx-key
        <div className='list'>
            <div className='teacher-detail'>
                 <img src={teacher.image} alt={teacher.name} />
                 <h2>{teacher.name}</h2>
            </div>
            <span>{teacher.duration}</span>
            <span>{teacher.cost}/hr</span>
            <span className='teacher-todo'> : </span>
         </div>
        ))}
     </div>
     </div>
  );
};

export default TeacherList;
