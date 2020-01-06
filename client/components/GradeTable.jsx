import React from 'react';
import Grade from './Grade';

class GradeTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grades: this.props.grades
    };
  }

  generateGradeRows() {
    const gradesList = this.props.grades;
    const gradeRows = gradesList.map(grade => {
      return <Grade key={grade.id} name={grade.name} course={grade.course} grade={grade.grade} />;
    });
    return gradeRows;

  }

  checkForEmptyData() {
    const gradesList = this.props.grades;
    if (gradesList.length === 0) {
      return <div>There are no records to display</div>;
    }
    return (
      <table className='table table-striped'>
        <thead>
          <tr>
            <th scope='col'>Student Name</th>
            <th scope='col'>Course</th>
            <th scope='col'>Grade</th>
          </tr>
        </thead>
        <tbody>
          {this.generateGradeRows()}
        </tbody>
      </table>
    );
  }

  render() {
    return (
      this.checkForEmptyData()
    );
  }
}
export default GradeTable;
