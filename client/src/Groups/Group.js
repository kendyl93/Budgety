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
    <div className="group">
      <form>
        <input onChange={onChangeName} value={name} />
        <textarea onChange={onChangeDescription} value={description} />
        {/* <Members /> */}
      </form>
    </div>
  );
};

export default Group;
