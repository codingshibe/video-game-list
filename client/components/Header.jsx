import React from 'react';

function Header(props) {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-xs-12 col-sm-12 col-md-9'>
          <h2 className='headline'>Video Games List</h2>
        </div>
        <div className='col-xs-12 col-sm-12 col-md-3 average'><h4>Average Price <span className='badge badge-light'><i className='fas fa-dollar-sign'/> {props.average}</span></h4></div>
      </div>
    </div>
  );
}

export default Header;
