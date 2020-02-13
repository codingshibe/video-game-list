import React from 'react';

function Header(props) {
  return (
    <div className='header-div'>
      <h2 className='headline'>Video Games List</h2>
      <div className='average'><h4>Average Price <span className='badge badge-light'><i className='fas fa-dollar-sign'/> {props.average}</span></h4></div>

    </div>
  );
}

export default Header;
