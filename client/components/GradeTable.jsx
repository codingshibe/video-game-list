import React from 'react';
import Grade from './Grade';

class GradeTable extends React.Component {

  generateGradeRows() {
    const gamesList = this.props.games;
    const gameRows = gamesList.map(game => {
      return <Grade key={game.gameId} gameId={game.gameId} title={game.title} platform={game.platform} price={game.price} onDelete={this.props.deleteMethod} populateForm={this.props.populateForm}/>;
    });
    return gameRows;

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
