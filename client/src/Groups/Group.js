import React from 'react';

const getIdFromUri = () => {
  const { href } = location;
  const splittedHref = href.split('/');
  const lastSplittedHrefElement = splittedHref.length - 1;
  const id = splittedHref[lastSplittedHrefElement];

  return id;
};

const Group = ({ groups, users }) => {
  const id = getIdFromUri();

  return (
    <div className="group">
      <h1>GROUP, {groups[id].name}</h1>
    </div>
  );
};

export default Group;
