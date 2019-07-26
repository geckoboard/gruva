const milestonesController = require('../controllers').milestones;
const epicsController = require('../controllers').epics;
const storiesController = require('../controllers').stories;

module.exports = app => {
  app.get('/api', (req, res) =>
    res.status(200).send({
      message: 'Welcome to Gruva API!',
    }),
  );

  app.get('/api/milestones', milestonesController.list);
  app.get('/api/milestones/:milestone_id/epics', epicsController.forMilestone);
  app.get(
    '/api/milestones/:milestone_id/stories',
    storiesController.forMilestone,
  );

  app.put('/api/stories/:story_id/update', storiesController.update);
};
