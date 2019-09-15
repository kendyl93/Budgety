import React, { useState } from 'react';
import axios from 'axios';

const { HOST_URI } = window.process.env;
const endpoint = query => `${HOST_URI}/${query}`;

const onChange = set => event => set(event.target.value);

const Create = () => {
  const [description, setDescription] = useState('');
  const [responsible, setResponsible] = useState('');
  const [priority, setPriority] = useState('');
  const [completed, setCompleted] = useState(false);

  const onChangeTodoDescription = onChange(setDescription);
  const onChangeTodoResponsible = onChange(setResponsible);
  const onChangeTodoPriority = onChange(setPriority);

  const clearState = () => {
    setDescription('');
    setResponsible('');
    setPriority('');
    setCompleted(false);
  };

  const onSubmit = event => {
    event.preventDefault();

    const todo = { description, responsible, priority, completed };

    axios.post(endpoint('api/add'), todo).then(res => console.log(res.data));

    clearState();
  };

  return (
    <div style={{ marginTop: 10 }}>
      <h3>Create New Todo</h3>
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

        <div className="form-group">
          <input
            className="btn btn-primary"
            type="submit"
            value="Create Todo"
          />
        </div>
      </form>
    </div>
  );
};

export default Create;
