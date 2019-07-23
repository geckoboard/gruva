const whitelistMilestone = milestone => ({
  id: milestone.id,
  name: milestone.name,
  completed: milestone.completed,
  started: milestone.started,
});

const whitelistEpic = epic => ({
  id: epic.id,
  name: epic.name,
});

module.exports = {
  whitelistMilestone,
  whitelistEpic,
};
