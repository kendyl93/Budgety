import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const { HOST_URI, REVERSE_PROXY_PORT, NODE_ENV } = window.process.env || {};
const FULL_HOST_URI =
  NODE_ENV === 'production'
    ? `http://${HOST_URI}`
    : `http://${HOST_URI}:${REVERSE_PROXY_PORT}`;

const fetchData = async setExpences => {
  const result = await axios(`${FULL_HOST_URI}/api/expences`);

  setExpences(result.data);
};

const Expence = ({ expence: { amount, _id: id } }) => {
  return (
    <tr>
      <td>{amount}</td>
      <td>
        <Link to={`/edit/${id}`}>Edit</Link>
      </td>
    </tr>
  );
};

const expenceList = expences =>
  expences.map((expence, i) => <Expence expence={expence} key={i} />);

const Expences = () => {
  const [expences, setExpences] = useState([]);

  useEffect(() => {
    fetchData(setExpences);
  }, []);

  return (
    <div>
      <h3>Expences List</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {expences && expences.length > 0 && expenceList(expences)}
        </tbody>
      </table>
    </div>
  );
};

export default Expences;
