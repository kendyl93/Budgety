import React, { useState } from 'react';
import { postRequest } from '../api';
import { useDatabaseData } from '../hooks';

const onChange = set => event => set(event.target.value);

const Create = () => {
  const [amount, setAmount] = useState('');
  const { currentUser } = useDatabaseData();

  const onChangeExpenceAmount = onChange(setAmount);

  const clearState = () => setAmount('');

  const onSubmit = async event => {
    event.preventDefault();

    const { _id: currentUserId } = currentUser;

    const expence = { amount, userId: currentUserId };

    await postRequest('expences/add', expence);

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
            disabled={!amount}
            type="submit"
            value="Create Expence"
          />
        </div>
      </form>
    </div>
  );
};

export default Create;
