import React, { useState } from 'react';

const getIdFromUri = () => {
  const { href } = location;
  const splittedHref = href.split('/');
  const lastSplittedHrefElement = splittedHref.length - 1;
  const id = splittedHref[lastSplittedHrefElement];

  return id;
};

const handleChange = set => () => {
  const {
    target: { value = '' }
  } = event || {};

  set(value);
};

const Avatar = ({ name }) => (
  <div className="avatar-box">
    <span>{name.charAt(0).toUpperCase()}</span>
  </div>
);
const Group = ({ groups, users }) => {
  const id = getIdFromUri();
  const {
    name: sourceName,
    members,
    description: sourceDescription = ''
  } = groups[id];

  const [name, setName] = useState(sourceName);
  const [description, setDescription] = useState(sourceDescription);

  const onChangeName = handleChange(setName);
  const onChangeDescription = handleChange(setDescription);

  return (
    <div className="single-group row-spacing">
      <div className="avatar-wrapper">
        <Avatar name={name} />
        <h1>{name}</h1>
      </div>
      <form className="row-spacing">
        <div className="form-element">
          <span>Name:</span>
          <input onChange={onChangeName} value={name} />
        </div>
        <div className="form-element">
          <span>Description:</span>
          <textarea onChange={onChangeDescription} value={description} />
        </div>
        {/* <Members /> */}
      </form>
      <button>save</button>
    </div>
  );
};

export default Group;
