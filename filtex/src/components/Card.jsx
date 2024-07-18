// eslint-disable-next-line no-unused-vars
import React from 'react'
import { BiLogoHtml5 } from 'react-icons/bi'

const courses = [
    {
        title: 'Web Development',
        icon: <BiLogoHtml5 />,
    },
    {
        title: 'Web Development',
        icon: <BiLogoHtml5 />,
    },
    {
        title: 'Web Development',
        duration: '2hours',
        icon: <BiLogoHtml5 />,
    },
];

const Card = () => {
  return (
    <div className='card-container'>
        {courses.map(() => (
            // eslint-disable-next-line react/jsx-key
            <div className='card'>
                {/* <div className='card-cover'>
                    {item.icon}
                </div> */}
                {/* <div className='card-title'>
                    <h2>{item.title}</h2>
                </div> */}
            </div>
        ))}
    </div>
  );
};

export default Card;
