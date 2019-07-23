const milestonesController = require('../controllers').milestones;

module.exports = app => {
  app.get('/api', (req, res) =>
    res.status(200).send({
      message: 'Welcome to Gruva API!',
    }),
  );

  app.get('/milestones', milestonesController.list);
};
