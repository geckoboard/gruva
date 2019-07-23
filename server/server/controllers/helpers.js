const whitelistMilestone = milestone => ({
  id: milestone.id,
  name: milestone.name,
});

const milestonesEpics = epics => ({
  id: epics.id,
  name: epics.name,
});

module.exports = {
  whitelistMilestone,
  milestonesEpics,
};
