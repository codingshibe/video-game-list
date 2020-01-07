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
    this.resetFormFields = this.resetFormFields.bind(this);
    this.handleClick = this.handleClick.bind(this);
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

  handleClick(event) {
    event.preventDefault();
    const studentData = { name: this.state.name, course: this.state.course, grade: parseInt(this.state.grade) };
    this.props.onSubmit(studentData);
    this.resetFormFields();

  }

  resetFormFields(event) {
    this.setState({ name: '', course: '', grade: '' });
  }

  render() {
    const name = this.state.name;
    const course = this.state.course;
    const grade = this.state.grade;
    return (
      <form onSubmit={this.handleClick} onReset={this.resetFormFields}>
        <div className='input-group mb-3'>
          <div className='input-group-prepend'>
            <span className='input-group-text'>
              <i className='fas fa-user' />
            </span>
          </div>
          <input type='text' className='form-control' placeholder='Student Name' value={name}onChange={this.handleNameInput}></input>
        </div>
        <div className='input-group mb-3'>
          <div className='input-group-prepend'>
            <span className='input-group-text'>
              <i className='fas fa-list-alt' />
            </span>
          </div>
          <input type='text' className='form-control' value={course}placeholder='Course' onChange={this.handleCourseInput}></input>
        </div>
        <div className='input-group mb-3'>
          <div className='input-group-prepend'>
            <span className='input-group-text'>
              <i className='fas fa-graduation-cap' />
            </span>
          </div>
          <input type='number' className='form-control' value={grade} placeholder='Grade' onChange={this.handleGradeInput}></input>
        </div>
        <button type='submit' className='btn btn-success' id='addButton'>Add</button>
        <button type='reset' className='btn btn-light' id='cancelButton'>Cancel</button>
      </form>
    );
  }
}

export default GradeForm;
