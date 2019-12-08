import axios from 'axios';
import { FULL_HOST_URI } from '../environment';

const COOKIE_TOKEN_NAME = 'access_token';

export const getCookie = tokenName => {
  const nameWithEaualSign = `${tokenName}=`;
  const existingCookie = document.cookie;
  const maybeCookies = existingCookie && existingCookie.split(';');

  const cookieWithName =
    maybeCookies &&
    maybeCookies.find(cookie => cookie.startsWith(nameWithEaualSign));

  const lastIndexOfTokenNameWithEqualSign = nameWithEaualSign.length;
  const lastIndexOfToken = cookieWithName.length;

  return cookieWithName.substring(
    lastIndexOfTokenNameWithEqualSign,
    lastIndexOfToken
  );
};

const requestConfig = {
  headers: { Authorization: `Bearer ${getCookie(COOKIE_TOKEN_NAME)}` }
};

export const getRequest = async (endpoint = '') =>
  await axios.get(`${FULL_HOST_URI}/${endpoint}`, requestConfig);

export const putRequest = async (endpoint = '', data) =>
  await axios.put(`${FULL_HOST_URI}/${endpoint}`, data, requestConfig);

export const postRequest = async (endpoint = '', data) =>
  await axios.post(`${FULL_HOST_URI}/${endpoint}`, data, requestConfig);

export const deleteRequest = async (endpoint = '') =>
  await axios.delete(`${FULL_HOST_URI}/${endpoint}`, requestConfig);

export const fetchData = async (setData, endpoint) => {
  const { data } = await getRequest(endpoint);

  setData(data);
};
