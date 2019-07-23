const request = require('request-promise');
const { whitelistEpic } = require('./helpers');
const { API_URL, API_KEY } = require('./constants');

const forMilestone = (req, res, next) => {
  const { milestone_id } = req.params;
  const qs = {
    token: API_KEY,
    page_size: 25,
    query: `milestone:${milestone_id}`,
    next: req.next,
  };

  const options = {
    uri: `${API_URL}/search/epics`,
    qs,
    json: true,
  };

  return request(options)
    .then((epics = []) => {
      res.status(200).send(epics.data.map(whitelistEpic));
    })
    .catch(next);
};

module.exports = { forMilestone };
