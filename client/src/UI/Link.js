import React from 'react';
import { Link as ReactLink } from 'react-router-dom';

const Link = ({ children, path, ...rest }) => (
  <ReactLink to={path} {...rest}>
    {children}
  </ReactLink>
);

export default Link;
