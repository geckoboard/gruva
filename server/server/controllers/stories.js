const request = require('request-promise');
const { whitelistStory } = require('./helpers');
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
    uri: `${API_URL}/search/stories`,
    qs,
    json: true,
  };

  return request(options)
    .then(stories => {
      res.status(200).send({
        ...stories,
        data: stories.data.map(whitelistStory),
      });
    })
    .catch(next);
};

const update = (req, res, next) => {
  const options = {
    method: 'PUT',
    uri: `${API_URL}/stories/${req.params.story_id}`,
    qs: { token: API_KEY },
    body: req.body,
    json: true,
  };

  return request(options)
    .then(story => {
      res.status(200).send(whitelistStory(story));
    })
    .catch(next);
};

module.exports = { forMilestone, update };
