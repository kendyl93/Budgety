import { useState, useEffect } from 'react';
import { getRequest } from './api';

export const useDatabaseData = () => {
  const [allData, setDatabaseData] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getRequest();

        setDatabaseData(data);
      } catch (error) {
        setDatabaseData(null);
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return allData;
};
