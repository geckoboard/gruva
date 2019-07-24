import { sortBy } from 'lodash';

export const categoriseMilestones = milestones => {
  const categorised = milestones.reduce(
    (categorised, milestone) => {
      if (milestone.completed) {
        categorised.completed.push(milestone);
      } else if (milestone.started) {
        categorised.started.push(milestone);
      } else {
        categorised.ready.push(milestone);
      }

      return categorised;
    },
    {
      ready: [],
      started: [],
      completed: [],
    },
  );

  categorised.ready = sortBy(categorised.ready, 'name');
  categorised.started = sortBy(categorised.started, 'name');
  categorised.completed = sortBy(categorised.completed, 'name');

  return categorised;
};
