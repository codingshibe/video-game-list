import React from 'react';
import Header from './Header';
import GradeTable from './GradeTable';
import GradeForm from './GradeForm';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { grades: [] };
    this.postToSGT = this.postToSGT.bind(this);
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

  postToSGT(newStudent) {
    const config = {
      method: 'POST',
      body: JSON.stringify(newStudent),
      headers: {
        'Content-Type': 'application/json'
      }
    };
    fetch('/api/grades', config)
      .then(data => {
        return data.json();
      })
      .then(data => {
        const currentData = [...this.state.grades];
        currentData.push(data);
        this.setState({ grades: currentData });

      })
      .catch(err => {
        console.error(err);
      });

  }

  deleteFromSGT(id) {
    const config = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    fetch(`/api/grades/${id}`, config)
      .then(data => {
        return data.json();
      })
      .then(data => {
        return data;
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    return (
      <React.Fragment>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <Header average={this.calculateAverage()}/>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-9'>
              <GradeTable grades={this.state.grades} />
            </div>
            <div className='col-md-3'>
              <GradeForm onSubmit={this.postToSGT}/>
            </div>

          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
