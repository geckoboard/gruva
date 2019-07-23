const categoriseMilestones = milestones => {
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

  categorised.ready.sort();
  categorised.started.sort();
  categorised.completed.sort();

  return categorised;
};

export { categoriseMilestones };
