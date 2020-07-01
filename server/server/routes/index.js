const path = require('path');
const membersController = require('../controllers').members;
const milestonesController = require('../controllers').milestones;
const epicsController = require('../controllers').epics;
const storiesController = require('../controllers').stories;
const workflowsController = require('../controllers').workflows;

module.exports = app => {
  app.get('/api', (req, res) =>
    res.status(200).send({
      message: 'Welcome to Gruva API!',
    }),
  );

  // API
  app.get('/api/milestones', milestonesController.list);
  app.get('/api/milestones/:milestone_id/epics', epicsController.forMilestone);
  app.get(
    '/api/milestones/:milestone_id/stories',
    storiesController.forMilestone,
  );

  app.get('/api/members', membersController.list);
  app.get('/api/workflows', workflowsController.list);

  app.get('/api/epics/:epic_id', epicsController.get);
  app.put('/api/stories/:story_id/update', storiesController.update);

  // App URLS
  app.get('/milestones', (req, res) =>
    res.sendFile(path.join(__dirname + '/../../../client/dist/index.html')),
  );

  app.get('/milestones/:milestone_id/overview', (req, res) =>
    res.sendFile(path.join(__dirname + '/../../../client/dist/index.html')),
  );

  app.get('/milestones/:milestone_id/standup', (req, res) =>
    res.sendFile(path.join(__dirname + '/../../../client/dist/index.html')),
  );
};
