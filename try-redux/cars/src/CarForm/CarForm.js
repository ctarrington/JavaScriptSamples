import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCar } from '../actions';

class CarForm extends Component {
  constructor(props) {
    super(props);
    this.state = { make: '', model: '' };

    this.handleChangeMake = this.handleChangeMake.bind(this);
    this.handleChangeModel = this.handleChangeModel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeMake(event) {
    this.setState({ make: event.target.value });
  }

  handleChangeModel(event) {
    this.setState({ model: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { make, model } = this.state;
    this.props.dispatch(addCar(make, model));
    this.setState({ make: '', model: '' });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Make:
          <input type="text" value={this.state.make} onChange={this.handleChangeMake} />
        </label>

        <label>
          Model:
          <input type="text" value={this.state.model} onChange={this.handleChangeModel} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default connect()(CarForm);
