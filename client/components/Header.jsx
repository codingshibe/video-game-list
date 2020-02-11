import React from 'react';

function Header(props) {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-xs-12 col-sm-12 col-md-9'>
          <h2>Video Games List</h2>
        </div>
        <div className='col-xs-12 col-sm-12 col-md-3'><h4>Average Price <span className='badge badge-secondary'>{props.average}</span></h4></div>
      </div>
    </div>
  );
}

export default Header;
