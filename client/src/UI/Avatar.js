import React from 'react';

const Avatar = ({ name }) => (
  <div className="avatar-box">
    <span>{name.charAt(0).toUpperCase()}</span>
  </div>
);

export default Avatar;
