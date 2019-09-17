import redbird from 'redbird';
import { PORT, HOST_URI } from './environment';
const proxy = redbird({ port: PORT });

proxy.register(`${HOST_URI}/sign-in`, `http://${HOST_URI}:8050/sign-in`);
proxy.register(`${HOST_URI}/api`, `http://${HOST_URI}:4000/api`);
proxy.register(`${HOST_URI}/`, `http://${HOST_URI}:3000`);
