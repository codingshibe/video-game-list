import React from 'react';

class Grade extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.title}</td>
        <td>{this.props.platform}</td>
        <td>{this.props.price}</td>
        <td><button type='button' className='btn btn-danger btn-sm'
          onClick={() => this.props.onDelete(this.props.gameId)}>
          X</button> <button type='button' className='btn btn-warning btn-sm' onClick={() => this.props.populateForm(this.props.gameId)}>Update</button></td>
      </tr>
    );
  }
}

export default Grade;
