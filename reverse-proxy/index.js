import redbird from 'redbird';
import { HOST_URI_ALONE } from './environment';

const proxy = redbird({ port: 5470 });

console.log({ HOST_URI_ALONE });

proxy.register(
  `${HOST_URI_ALONE}/sign-in`,
  `http://${HOST_URI_ALONE}:8050/sign-in`
);
proxy.register(`${HOST_URI_ALONE}/api`, `http://${HOST_URI_ALONE}:4000/api`);
proxy.register(`${HOST_URI_ALONE}/`, `http://${HOST_URI_ALONE}:3000`);
