import React from 'react';
import { Link as ReactLink } from 'react-router-dom';

const Link = ({ children, path }) => (
  <ReactLink to={path}>{children}</ReactLink>
);

export default Link;
