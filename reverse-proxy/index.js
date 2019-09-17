import redbird from 'redbird';

const proxy = redbird({ port: 5470 });

proxy.register('localhost/sign-in', 'http://localhost:8050/sign-in');
proxy.register('localhost/api', 'http://localhost:4000/api');
proxy.register('localhost/', 'http://localhost:8081');
