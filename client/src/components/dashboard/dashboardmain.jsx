import React, { useState } from 'react';
import './dashboardmain.scss';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PermissionRequest from './PermissionRequest';
import EditUserPost from './EditUserPost';

function Dashboard(props) {
  const [value, setValue] = useState('one');
  const handleChange = (event, newValue) => {
    var element1 = document.getElementById('one');
    var element2 = document.getElementById('two');
    //   var element3 = document.getElementById('three');
    if (!element1.classList.contains('mystyle')) {
      element1.classList.toggle('mystyle');
    }
    if (!element2.classList.contains('mystyle')) {
      element2.classList.toggle('mystyle');
    }
    console.log(value);
    var element = document.getElementById(newValue);
    element.classList.toggle('mystyle');
    console.log(element1);
    setValue(newValue);
  };
  return (
    <div className="dashboardmain">
      <div className="head">
        <div style={{ paddingTop: '125px' }}>Hi Admin!</div>
      </div>
      <div className="midhead">
        <h1>Let's Do Some Work !</h1>
      </div>
      <div>
        <Tabs
          className="TabContainer"
          value={value}
          onChange={handleChange}
          aria-label="wrapped label tabs example"
        >
          <Tab value="one" label="Permission Request" className="tabs" />
          <Tab value="two" label="Edit/Delete User's Post" className="tabs" />
        </Tabs>
      </div>
      <div id="one">
        <PermissionRequest requests={props.requests} fetchData={props.fetchData} />
      </div>
      <div id="two" className="mystyle">
        <EditUserPost users={props.users} />
      </div>
    </div>
  );
}
export default Dashboard;
