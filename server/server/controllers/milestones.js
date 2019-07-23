const request = require('request-promise');
const { whitelistMilestone } = require('./helpers');
const { API_URL, API_KEY } = require('./constants');

const list = (req, res, next) => {
  const qs = {
    token: API_KEY,
    page_size: 25,
  };

  const options = {
    uri: `${API_URL}/milestones`,
    qs,
    json: true,
  };

  return request(options)
    .then((milestones = []) => {
      res.status(200).send(milestones.map(whitelistMilestone));
    })
    .catch(next);
};

module.exports = { list };
