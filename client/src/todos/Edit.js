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
      description: '',
      responsible: '',
      priority: '',
      completed: false
    };
  }

  componentDidMount = async () => {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const {
      data: { description, responsible, priority, completed }
    } = await axios(`${FULL_HOST_URI}/api/${id}`);

    this.setState({
      description,
      responsible,
      priority,
      completed
    });
  };

  onSubmit = async event => {
    event.preventDefault();

    const {
      match: {
        params: { id }
      }
    } = this.props;
    const todo = this.state;

    await axios.put(`${FULL_HOST_URI}/api/${id}`, todo);

    this.props.history.push('/');
  };

  onDeleteClick = async () => {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    await axios.delete(`${FULL_HOST_URI}/api/${id}`);

    this.props.history.push('/');
  };

  onChangeTodoDescription = event => {
    const { value } = event.target;

    this.setState({
      description: value
    });
  };

  onChangeTodoResponsible = event => {
    const { value } = event.target;

    this.setState({
      responsible: value
    });
  };

  onChangeTodoPriority = event => {
    const { value } = event.target;

    this.setState({
      priority: value
    });
  };

  onChangeTodoCompleted = () => {
    const { completed } = this.state;

    this.setState({
      completed: !completed
    });
  };

  render() {
    const { description, responsible, priority, completed } = this.state;
    const {
      onSubmit,
      onChangeTodoDescription,
      onChangeTodoResponsible,
      onChangeTodoPriority,
      onChangeTodoCompleted,
      onDeleteClick
    } = this;

    return (
      <div>
        <h3 align="center">Update Todo</h3>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Description: </label>
            <input
              className="form-control"
              onChange={onChangeTodoDescription}
              type="text"
              value={description}
            />
          </div>
          <div className="form-group">
            <label>Responsible: </label>
            <input
              className="form-control"
              onChange={onChangeTodoResponsible}
              type="text"
              value={responsible}
            />
          </div>
          <div className="form-group">
            <div className="form-check form-check-inline">
              <input
                checked={priority === 'Low'}
                className="form-check-input"
                id="priorityLow"
                name="priorityOptions"
                onChange={onChangeTodoPriority}
                type="radio"
                value="Low"
              />
              <label className="form-check-label">Low</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                checked={priority === 'Medium'}
                className="form-check-input"
                id="priorityMedium"
                name="priorityOptions"
                onChange={onChangeTodoPriority}
                type="radio"
                value="Medium"
              />
              <label className="form-check-label">Medium</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                checked={priority === 'High'}
                className="form-check-input"
                id="priorityHigh"
                name="priorityOptions"
                onChange={onChangeTodoPriority}
                type="radio"
                value="High"
              />
              <label className="form-check-label">High</label>
            </div>
          </div>
          <div className="form-check">
            <input
              checked={completed}
              className="form-check-input"
              id="completedCheckbox"
              name="completedCheckbox"
              onChange={onChangeTodoCompleted}
              type="checkbox"
              value={completed}
            />
            <label className="form-check-label" htmlFor="completedCheckbox">
              Completed
            </label>
          </div>

          <br />

          <div className="form-group">
            <input
              className="btn btn-primary"
              type="submit"
              value="Update Todo"
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
