const request = require('request-promise');
const { whitelistMember } = require('./helpers');
const { API_URL, API_KEY } = require('./constants');

const list = (req, res, next) =>
  request({
    uri: `${API_URL}/members`,
    qs: { token: API_KEY },
    json: true,
  })
    .then(members => {
      return res.status(200).send(members.map(whitelistMember));
    })
    .catch(next);

module.exports = {
  list,
};
