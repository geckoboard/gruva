const request = require('request-promise');
const { milestonesEpics } = require('./helpers');
const { API_URL, API_KEY } = require('./constants');

const forMilestone = (req, res, next) => {
  const qs = {
    token: API_KEY,
    page_size: 25,
    query: req.query.query,
//    next: req.query.next,
  };

  const options = {
    uri: `${API_URL}/search/epics?query=epic:2671`,

    console.log(uri)

    qs,
    json: true,
  };

  return request(options)
    .then((milestonesEpics = []) => {
      res.status(200).send({
        data: epics.map(milestonesEpics),
      });
    })
    .catch(next);
};

module.exports = { forMilestone };
