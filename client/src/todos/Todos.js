import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import completedImg from '../images/OK.png';

const { HOST_URI, REVERSE_PROXY_PORT, NODE_ENV } = window.process.env;
const FULL_HOST_URI =
  NODE_ENV === 'production'
    ? `http://${HOST_URI}`
    : `http://${HOST_URI}:${REVERSE_PROXY_PORT}`;

const fetchData = async setTodos => {
  const result = await axios(`${FULL_HOST_URI}/api`);

  setTodos(result.data);
};

const Todo = ({
  todo: {
    completed,
    description = '',
    _id: id,
    priority = '',
    responsible = ''
  }
}) => {
  const maybeCompleted = completed ? 'completed' : '';

  return (
    <tr>
      <td className={maybeCompleted}>
        {description}
        {completed && <img alt={maybeCompleted} src={completedImg} />}
      </td>
      <td className={maybeCompleted}>{responsible}</td>
      <td className={maybeCompleted}>{priority}</td>
      <td>
        <Link to={`/edit/${id}`}>Edit</Link>
      </td>
    </tr>
  );
};

const todoList = todos => todos.map((todo, i) => <Todo key={i} todo={todo} />);

const Todos = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchData(setTodos);
  }, []);

  return (
    <div>
      <h3>Todos List</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Description</th>
            <th>Responsible</th>
            <th>Priority</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{todos.length > 0 && todoList(todos)}</tbody>
      </table>
    </div>
  );
};

export default Todos;
