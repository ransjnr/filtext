// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BiHome, BiBookAlt, BiSolidReport, BiUser } from 'react-icons/bi';
// import { MdOutlineHorizontalRule } from "react-icons/md";
// import { IoIosChatbubbles } from "react-icons/io";
import Select from 'react-select'; // Import react-select for dropdown
import '../styles/sidebar.css';

const Sidebar = () => {
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  return (
    <div className="menu">
      <div className="logo">
        <h2>filtext</h2>
      </div>

      <div className="menu-list">
        <a href="#" className="item active">
          <BiHome />
          Dashboard 
        </a>
        <a href="#" className="item">
          <BiBookAlt />
          History
        </a>
        <a href="#" className="item">
          <BiSolidReport />
          API Documentation
        </a>
        <a href="#" className="item">
          <BiUser />
          Join community
        </a>
      </div>

      <div className="filters">
        <h3>Filters</h3>
        <Select 
          options={options} 
          isMulti 
          className="dropdown" 
          placeholder="Select options..."
        />
        <div className="checkbox-menu">
          <label>
            <input type="checkbox" /> Option A
          </label>
          <label>
            <input type="checkbox" /> Option B
          </label>
          <label>
            <input type="checkbox" /> Option C
          </label>
        </div>
      </div>

      {/* <div className="menu-list" style={{ marginTop: 150, fontSize: 30 }}>
        <a href="#" className="">
          <IoIosChatbubbles />
        </a>
      </div> */}
    </div>
  );
};

export default Sidebar;