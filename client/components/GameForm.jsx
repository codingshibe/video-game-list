import React from 'react';

class GameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      platform: '',
      price: '',
      titleError: '',
      platformError: '',
      priceError: ''

    };
    this.handleTitleInput = this.handleTitleInput.bind(this);
    this.handlePlatformInput = this.handlePlatformInput.bind(this);
    this.handlePriceInput = this.handlePriceInput.bind(this);
    this.resetFormFields = this.resetFormFields.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedGame !== prevProps.selectedGame) {
      let title;
      let platform;
      let price;
      if (this.props.selectedGame) {
        title = this.props.selectedGame.title;
        platform = this.props.selectedGame.platform;
        price = this.props.selectedGame.price;
      } else {
        title = '';
        platform = '';
        price = '';
      }
      this.setState({
        title: title,
        platform: platform,
        price: price
      });
    }
  }

  handleTitleInput(event) {
    this.setState({ title: event.target.value });
  }

  handlePlatformInput(event) {
    this.setState({ platform: event.target.value });
  }

  handlePriceInput(event) {
    this.setState({ price: event.target.value });
  }

  handleClick(event) {
    event.preventDefault();
    const gameData = { title: this.state.title, platform: this.state.platform, price: parseInt(this.state.price) };
    if (this.validation(gameData)) {
      this.props.onSubmit(gameData);
      this.resetFormFields();
    }

  }

  validation(formValues) {
    if (formValues.title && formValues.platform && formValues.price && formValues.price.length <= 4) {
      return true;
    }
  }

  resetFormFields(event) {
    this.setState({ title: '', platform: '', price: '', titleError: '', platformError: '', priceError: '' });
  }

  render() {
    const title = this.state.title;
    const platform = this.state.platform;
    const price = this.state.price;
    const titleError = this.state.titleError;
    const platformError = this.state.platformError;
    const priceError = this.state.priceError;
    return (
      <div className="form-div col-md-3">
        <form onSubmit={this.handleClick} onReset={this.resetFormFields}>
          <div className='input-group mt-2'>
            <div className='input-group-prepend'>
              <span className='input-group-text'>
                <i className='fas fa-gamepad' />
              </span>
            </div>
            <input type='text' className='form-control' placeholder='Game Title' value={title}onChange={this.handleTitleInput}></input>
          </div>
          <small className="ml-5">{titleError}</small>
          <div className='input-group mt-2'>
            <div className='input-group-prepend'>
              <span className='input-group-text'>
                <i className='fas fa-window-restore' />
              </span>
            </div>
            <input type='text' className='form-control' value={platform}placeholder='Platform' onChange={this.handlePlatformInput}></input>
          </div>
          <small className="ml-5">{platformError}</small>
          <div className='input-group mt-2'>
            <div className='input-group-prepend'>
              <span className='input-group-text'>
                <i className='fas fa-money-bill-alt' />
              </span>
            </div>
            <input type='number' className='form-control' value={price} placeholder='Price' onChange={this.handlePriceInput}></input>
          </div>
          <small className='ml-5 mb-3'>{priceError}</small>
          <div className="input-group mt-1 mb-3">
            <button type='submit' className='btn add-button' id='addButton'>Add</button> <button type='reset' className='btn btn-light ml-1' id='cancelButton'>Cancel</button>
          </div>
        </form>
      </div>
    );
  }
}

export default GameForm;
