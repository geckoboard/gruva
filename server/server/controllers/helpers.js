const whitelistMilestone = milestone => ({
  id: milestone.id,
  name: milestone.name,
  completed: milestone.completed,
  started: milestone.started,
});

module.exports = {
  whitelistMilestone,
};
