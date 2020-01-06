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

  render() {
    return (
      <React.Fragment>
        <Header />
        <GradeTable grades={this.state.grades} />
      </React.Fragment>
    );
  }
}

export default App;
