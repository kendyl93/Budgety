import redbird from 'redbird';
import { HOST_URI, REVERSE_PROXY_PORT } from './environment';

const proxy = redbird({ port: REVERSE_PROXY_PORT });

console.log({ HOST_URI });

proxy.register(`${HOST_URI}/sign-in`, `http://${HOST_URI}:8050/sign-in`);
proxy.register(`${HOST_URI}/api`, `http://${HOST_URI}:4000/api`);
proxy.register(`${HOST_URI}/`, `http://${HOST_URI}:3000`);
