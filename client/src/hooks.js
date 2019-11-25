import { useState, useEffect } from 'react';
import { getRequest } from './api';

export const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { user } = {} } = await getRequest();

        setCurrentUser(user);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return currentUser;
};
