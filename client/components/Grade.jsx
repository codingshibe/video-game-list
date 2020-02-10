import React from 'react';

class Grade extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.name}</td>
        <td>{this.props.course}</td>
        <td>{this.props.grade}</td>
        <td><button type='button' className='btn btn-danger btn-sm'
          onClick={() => this.props.onDelete(this.props.gradeId)}>
          Delete</button> <button type='button' className='btn btn-warning btn-sm' onClick={() => this.props.populateForm(this.props.gradeId)}>Update</button></td>
      </tr>
    );
  }
}

export default Grade;
