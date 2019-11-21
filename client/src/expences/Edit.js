import React, { Component } from 'react';
import axios from 'axios';

const { HOST_URI, REVERSE_PROXY_PORT, NODE_ENV } = window.process.env;
const FULL_HOST_URI =
  NODE_ENV === 'production'
    ? `http://${HOST_URI}`
    : `http://${HOST_URI}:${REVERSE_PROXY_PORT}`;

class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: ''
    };
  }

  componentDidMount = async () => {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const {
      data: { amount }
    } = await axios(`${FULL_HOST_URI}/api/expences/${id}`);

    this.setState({
      amount
    });
  };

  onSubmit = async event => {
    event.preventDefault();

    const {
      match: {
        params: { id }
      }
    } = this.props;
    const expence = this.state;

    await axios.put(`${FULL_HOST_URI}/api/expences/${id}`, expence);

    this.props.history.push('/');
  };

  onDeleteClick = async () => {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    await axios.delete(`${FULL_HOST_URI}/api/expences/${id}`);

    this.props.history.push('/');
  };

  onChangeExpenceAmount = event => {
    const { value } = event.target;

    this.setState({
      amount: value
    });
  };

  render() {
    const { amount } = this.state;
    const { onChangeExpenceAmount, onSubmit, onDeleteClick } = this;

    return (
      <div>
        <h3 align="center">Update Expence</h3>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Amount: </label>
            <input
              className="form-control"
              onChange={onChangeExpenceAmount}
              type="text"
              value={amount}
            />
          </div>

          <br />

          <div className="form-group">
            <input
              className="btn btn-primary"
              type="submit"
              value="Update Expence"
            />
          </div>
        </form>

        <button className="btn btn-danger" onClick={onDeleteClick}>
          delete
        </button>
      </div>
    );
  }
}

export default Edit;
