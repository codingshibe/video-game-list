import React from 'react';
import Header from './Header';
import GradeTable from './GradeTable';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { grades: [] };
  }

  componentDidMount() {
    fetch('/api/grades/')
      .then(data => {
        return data.json();
      })
      .then(data => {
        this.setState({ grades: data });
      })
      .catch(err => {
        console.error('There was an error: ', err);
      });
  }

  calculateAverage() {
    if (this.state.grades.length !== 0) {
      const grades = this.state.grades;
      let total = 0;
      for (let i = 0; i < grades.length; i++) {
        total += grades[i].grade;
      }
      return total / grades.length;
    }
    return 0;
  }

  render() {
    return (
      <React.Fragment>
        <div className='container'>
          <Header average={this.calculateAverage()}/>
          <GradeTable grades={this.state.grades} />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
