import { useState, useEffect } from 'react';
import { getRequest } from './api';

export const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getRequest();
        const { user = null } = data;

        setCurrentUser(user);
      } catch (error) {
        setCurrentUser(null);
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return currentUser;
};
