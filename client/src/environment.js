const { HOST_URI, REVERSE_PROXY_PORT, NODE_ENV } = window.process.env || {};

export const FULL_HOST_URI =
  NODE_ENV === 'production'
    ? `http://${HOST_URI}/api`
    : `http://${HOST_URI}:${REVERSE_PROXY_PORT}/api`;
