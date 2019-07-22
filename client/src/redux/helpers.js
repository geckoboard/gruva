export const getCurrentTeam = state =>
  state.teams.entities.find(t => t.id === state.teams.current);

export const getGoals = state => {
  const team = getCurrentTeam(state);

  return team ? team.goals : undefined;
};
