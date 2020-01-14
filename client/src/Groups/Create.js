import React, { useState } from 'react';

import { postRequest } from '../api';

const create = data => postRequest('groups', data);

const onCreateGroup = async data => {
  try {
    await create(data);
  } catch (error) {
    console.error(error);
  }
};

const Create = ({ currentUser }) => {
  const [name, setName] = useState('');

  const setGroupName = () => {
    const {
      target: { value }
    } = event;
    setName(value);
  };

  return (
    <div>
      <h1>Create group</h1>
      <form
        className="row-spacing"
        onSubmit={() => {
          currentUser && onCreateGroup({ user: currentUser, name });
        }}
      >
        <div className="field">
          <label>Name:</label>
          <input
            onChange={setGroupName}
            placeholder="My awesome group"
            type="text"
          />
        </div>
        <input type="submit" value="Create" />
      </form>
    </div>
  );
};

export default Create;
