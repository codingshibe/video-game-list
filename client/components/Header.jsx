import React from 'react';

function Header(props) {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col col-md-9'>
          <h2 className='m-l-0'>Student Grade Table</h2>
        </div>
        <div className='col col-md-3'><h4>Average Grade <span className='badge badge-secondary'>{props.average}</span></h4></div>
      </div>
    </div>
  );
}

export default Header;
