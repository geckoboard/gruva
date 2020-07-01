const request = require('request-promise');
const { whitelistWorkflow } = require('./helpers');
const { API_URL, API_KEY } = require('./constants');

const list = (req, res, next) => {
  request({
    uri: `${API_URL}/workflows`,
    qs: { token: API_KEY },
    json: true,
  })
    .then(workflows => {
      return res.status(200).send(workflows.map(whitelistWorkflow));
    })
    .catch(next);
};

module.exports = { list };
