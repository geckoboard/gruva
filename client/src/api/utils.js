import merge from 'deepmerge';

let sessionID;

export const getSessionID = () => {
  if (sessionID) {
    return sessionID;
  }

  sessionID =
    Math.random()
      .toString(36)
      .substring(2) + new Date().getTime().toString(36);

  return sessionID;
};

export const apiRequest = (url, options = {}) => {
  const sharedOptions = {
    credentials: 'same-origin',
    headers: {
      'X-Socket-Session': getSessionID(),
    },
  };

  return fetch(url, merge(options, sharedOptions));
};

export const API =
  process.env.NODE_ENV === 'development' ? 'http://localhost:8000/api' : '/api';

export const getJSON = x => x.json();
