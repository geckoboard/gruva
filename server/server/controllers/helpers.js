const whitelistMilestone = milestone => ({
  id: milestone.id,
  name: milestone.name,
});

const milestonesEpics = whitelistEpics => ({
  id: epic.id,
  name: epic.name,
});

module.exports = {
  whitelistMilestone,
  milestonesEpics,
};
