import * as React from 'react';
import { connect } from 'react-redux';
import { addCar } from '../actions';

class CarForm extends React.Component {
    public state: { make: string, model: string };
    public props: { dispatch: (object: any) => void };

    constructor(props: any) {
        super(props);
        this.state = { make: '', model: '' };

        this.handleChangeMake = this.handleChangeMake.bind(this);
        this.handleChangeModel = this.handleChangeModel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    public render() {
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

    private handleChangeMake(event: any) {
        this.setState({ make: event.target.value });
    }

    private handleChangeModel(event: any) {
        this.setState({ model: event.target.value });
    }

    private handleSubmit(event: any) {
        event.preventDefault();
        const { make, model } = this.state;
        this.props.dispatch(addCar(make, model));
        this.setState({ make: '', model: '' });
    }
}

export default connect()(CarForm);