import React, { useEffect, useState } from 'react';
import { getRequest, postRequest } from '../api';

const onChange = set => event => set(event.target.value);

const Create = () => {
  const [amount, setAmount] = useState('');
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // TRY TO FETCH DATA IN PARENT COMPONENT TO PREVENT RENDERING ON AMOUNT CHANGE
        const { data: { user } = {} } = await getRequest();

        setCurrentUser(user);

        console.log({ user });
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

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
