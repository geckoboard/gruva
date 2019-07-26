const request = require('request-promise');
const { whitelistEpic } = require('./helpers');
const { API_URL, API_KEY } = require('./constants');

const forMilestone = (req, res, next) => {
  const { milestone_id } = req.params;
  const qs = {
    token: API_KEY,
    page_size: 25,
    query: `milestone:${milestone_id}`,
    next: req.query.next,
  };

  const options = {
    uri: `${API_URL}/search/epics`,
    qs,
    json: true,
  };

  return request(options)
    .then(epics => {
      res.status(200).send({
        ...epics,
        data: epics.data.map(whitelistEpic),
      });
    })
    .catch(next);
};

const get = (req, res, next) => {
  const qs = {
    token: API_KEY,
  };

  const options = {
    uri: `${API_URL}/epics/${req.params.epic_id}`,
    qs,
    json: true,
  };

  return request(options)
    .then(epic => {
      res.status(200).send(whitelistEpic(epic));
    })
    .catch(next);
};

module.exports = { get, forMilestone };
