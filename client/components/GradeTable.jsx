import React from 'react';
import Grade from './Grade';

class GradeTable extends React.Component {

  generateGameRows() {
    const gamesList = this.props.games;
    const gameRows = gamesList.map(game => {
      return <Grade key={game.gameId} gameId={game.gameId} title={game.title} platform={game.platform} price={game.price} onDelete={this.props.deleteMethod} populateForm={this.props.populateForm}/>;
    });
    return gameRows;

  }

  checkForEmptyData() {
    const gamesList = this.props.games;
    if (gamesList.length === 0) {
      return <div>There are no games to display</div>;
    }
    return (
      <div className="table-div">
        <table className='table-striped table-dark'>
          <thead>
            <tr>
              <th>Title</th>
              <th>Platform</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {this.generateGameRows()}
          </tbody>
        </table>
      </div>
    );
  }

  render() {
    return (
      this.checkForEmptyData()
    );
  }
}
export default GradeTable;
