import React from 'react';
import Header from './Header';
import GameTable from './GameTable';
import GameForm from './GameForm';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
      currentId: null,
      indexOfCurrentId: null
    };
    this.postToVGL = this.postToVGL.bind(this);
    this.deleteFromVGL = this.deleteFromVGL.bind(this);
    this.populateForm = this.populateForm.bind(this);
  }

  componentDidMount() {
    fetch('/api/games/')
      .then(data => {
        return data.json();
      })
      .then(data => {
        this.setState({ games: data });
      })
      .catch(err => {
        console.error('There was an error: ', err);
      });
  }

  calculateAverage() {
    if (this.state.games.length !== 0) {
      const games = this.state.games;
      let total = 0;
      for (let i = 0; i < games.length; i++) {
        total += games[i].price;
      }
      return Math.ceil((total / games.length));
    }
    return 0;
  }

  postToVGL(newGame) {
    if (!newGame.title || !newGame.platform || !newGame.price) {
      return;
    }
    if (!this.state.currentId) {
      const config = {
        method: 'POST',
        body: JSON.stringify(newGame),
        headers: {
          'Content-Type': 'application/json'
        }
      };
      fetch('/api/games', config)
        .then(data => {
          return data.json();
        })
        .then(data => {
          const currentData = [...this.state.games];
          currentData.push(data);
          this.setState({ games: currentData });

        })
        .catch(err => {
          console.error(err);
        });
    } else {
      const currentId = this.state.currentId;
      const game = {
        title: newGame.title,
        platform: newGame.platform,
        price: newGame.price
      };
      const config = {
        method: 'PUT',
        body: JSON.stringify(game),
        headers: {
          'Content-Type': 'application/json'
        }
      };
      fetch(`/api/games/${currentId}`, config)
        .then(data => {
          return data.json();
        })
        .then(data => {
          const currentData = [...this.state.games];
          currentData[this.state.indexOfCurrentId].title = data.title;
          currentData[this.state.indexOfCurrentId].platform = data.platform;
          currentData[this.state.indexOfCurrentId].price = data.price;
          this.setState({
            games: currentData,
            currentId: null
          });
        })
        .catch(err => {
          console.error(err);
        });
    }

  }

  deleteFromVGL(id) {
    const config = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    fetch(`/api/games/${id}`, config)
      .then(data => {
        return data.json();
      })
      .then(data => {
        const currentData = [...this.state.games];
        const idCheck = index => index.gameId === id;
        const idToDelete = currentData.findIndex(idCheck);
        if (idToDelete !== -1) {
          currentData.splice(idToDelete, 1);
          this.setState({ games: currentData });
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  populateForm(id) {
    this.setState({ currentId: id });
    const currentData = [...this.state.games];
    const idCheck = index => index.gameId === id;
    const idToUpdate = currentData.findIndex(idCheck);
    if (idToUpdate !== -1) {
      this.setState({ indexOfCurrentId: idToUpdate });
    }

  }

  render() {
    return (
      <React.Fragment>
        <Header average={this.calculateAverage()}/>

        <div className='content-div d-flex flex-column-reverse flex-sm-column-reverse flex-md-row'>

          <GameTable games={this.state.games} deleteMethod={this.deleteFromVGL} populateForm={this.populateForm}/>

          <GameForm onSubmit={this.postToVGL} selectedGame={this.state.games[this.state.indexOfCurrentId]}/>

        </div>

      </React.Fragment>
    );
  }
}

export default App;
