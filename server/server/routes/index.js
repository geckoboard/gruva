const milestonesController = require('../controllers').milestones;
const epicsController = require('../controllers').epics;

module.exports = app => {
  app.get('/api', (req, res) =>
    res.status(200).send({
      message: 'Welcome to Gruva API!',
    }),
  );

  app.get('/api/milestones', milestonesController.list);
  app.get('/api/milestones/:milestone_id/epics', epicsController.forMilestone);
};
