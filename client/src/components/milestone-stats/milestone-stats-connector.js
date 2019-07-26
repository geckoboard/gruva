import { connect } from 'react-redux';
import MilestoneStats from './milestone-stats';

const mapStateToProps = (state, ownProps) => {
  const {
    epics: { byMilestoneId, loadingMilestoneIds },
  } = state;
  const { id } = ownProps;

  // Only pass epics down when they finished loading
  let milestoneEpics = [];
  if (!loadingMilestoneIds.includes(id)) {
    milestoneEpics = byMilestoneId[id] || [];
  }

  return {
    epics: milestoneEpics,
  };
};

const MilestoneStatsConnector = connect(mapStateToProps)(MilestoneStats);

export default MilestoneStatsConnector;
