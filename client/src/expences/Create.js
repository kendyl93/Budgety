import React, { useState } from 'react';
import axios from 'axios';

const { HOST_URI, REVERSE_PROXY_PORT, NODE_ENV } = window.process.env;
const FULL_HOST_URI =
  NODE_ENV === 'production'
    ? `http://${HOST_URI}`
    : `http://${HOST_URI}:${REVERSE_PROXY_PORT}`;

const endpoint = query => `${FULL_HOST_URI}/${query}`;

const onChange = set => event => set(event.target.value);

const Create = () => {
  const [amount, setAmount] = useState(77);

  const onChangeExpenceAmount = onChange(setAmount);

  const clearState = () => {
    onChangeExpenceAmount(undefined);
  };

  const onSubmit = event => {
    event.preventDefault();

    const expence = { amount: 5, _id: '123' };

    axios
      .post(endpoint('api/expences/add'), expence)
      .then(res => console.log(res.data));

    clearState();
  };

  return (
    <div style={{ marginTop: 10 }}>
      <h3>Create New Expence</h3>
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

        <div className="form-group">
          <input
            className="btn btn-primary"
            type="submit"
            value="Create Expence"
          />
        </div>
      </form>
    </div>
  );
};

export default Create;
