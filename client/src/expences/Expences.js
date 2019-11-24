import React, { useEffect, useState } from 'react';
import { getRequest } from '../api';
import { Link } from 'react-router-dom';

const fetchData = async setExpences => {
  const result = await getRequest('/expences');

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
