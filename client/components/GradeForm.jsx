import React from 'react';

class GradeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      course: '',
      grade: ''

    };
    this.handleNameInput = this.handleNameInput.bind(this);
    this.handleCourseInput = this.handleCourseInput.bind(this);
    this.handleGradeInput = this.handleGradeInput.bind(this);
  }

  handleNameInput(event) {
    this.setState({ name: event.target.value });
  }

  handleCourseInput(event) {
    this.setState({ course: event.target.value });
  }

  handleGradeInput(event) {
    this.setState({ grade: event.target.value });
  }

  render() {
    return (
      <div>
        <div className='input-group mb-3'>
          <div className='input-group-prepend'>
            <span className='input-group-text'>
              <i className='fas fa-user' />
            </span>
          </div>
          <input type='text' className='form-control' placeholder='Student Name' onChange={this.handleNameInput}></input>
        </div>
        <div className='input-group mb-3'>
          <div className='input-group-prepend'>
            <span className='input-group-text'>
              <i className='fas fa-list-alt' />
            </span>
          </div>
          <input type='text' className='form-control' placeholder='Course' onChange={this.handleCourseInput}></input>
        </div>
        <div className='input-group mb-3'>
          <div className='input-group-prepend'>
            <span className='input-group-text'>
              <i className='fas fa-graduation-cap' />
            </span>
          </div>
          <input type='number' className='form-control' placeholder='Grade' onChange={this.handleGradeInput}></input>
        </div>
        <button type='submit' className='btn btn-success' id='addButton'>Add</button>
        <button type='button' className='btn btn-light' id='cancelButton'>Cancel</button>
      </div>
    );
  }
}

export default GradeForm;
