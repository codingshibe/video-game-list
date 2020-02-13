import React from 'react';

function Header(props) {
  return (
    <div className='header-div d-flex flex-column flex-md-row p-3'>
      <h2 className='headline col-md-9'>Video Games List</h2>
      <div className='average col-md-3'><h4>Average Price <span className='badge badge-light'><i className='fas fa-dollar-sign'/> {props.average}</span></h4></div>

    </div>
  );
}

export default Header;
