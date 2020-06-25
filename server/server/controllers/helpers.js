const whitelistMilestone = milestone => ({
  id: milestone.id,
  name: milestone.name,
  completed: milestone.completed,
  started: milestone.started,
});

const whitelistEpic = epic => ({
  id: epic.id,
  stats: epic.stats,
  name: epic.name,
  archived: epic.archived,
  completed: epic.completed,
  started: epic.started,
  updated_at: epic.updated_at,
  position: epic.position,
  milestone_id: epic.milestone_id,
});

const whitelistStory = story => ({
  id: story.id,
  epic_id: story.epic_id,
  name: story.name,
  archived: story.archived,
  completed: story.completed,
  started: story.started,
  updated_at: story.updated_at,
  owner_ids: story.owner_ids,
  position: story.position,
  blocker: story.blocker,
  blocked: story.blocked,
  story_type: story.story_type,
  app_url: story.app_url,
});

const whitelistMember = member => ({
  id: member.id,
  profile: {
    name: member.profile.name,
    display_icon: member.profile.display_icon,
  },
});

module.exports = {
  whitelistMember,
  whitelistMilestone,
  whitelistEpic,
  whitelistStory,
};
