import React from 'react';
import Game from './Game';

class GameTable extends React.Component {

  generateGameRows() {
    const gamesList = this.props.games;
    const gameRows = gamesList.map(game => {
      return <Game key={game.gameId} gameId={game.gameId} title={game.title} platform={game.platform} price={game.price} onDelete={this.props.deleteMethod} populateForm={this.props.populateForm}/>;
    });
    return gameRows;

  }

  checkForEmptyData() {
    const gamesList = this.props.games;
    if (gamesList.length === 0) {
      return <div className="table-div col-md-9">
        <p className="no-games ml-1">There are no games to display</p>
      </div>;
    }
    return (
      <div className="table-div col-md-9">
        <table className='table table-striped table-dark'>
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
export default GameTable;
