import { connect } from 'react-redux';
import MilestonesList from './milestone-list';

const mapStateToProps = state => {
  const {
    milestones: { entities },
  } = state;

  return {
    milestones: entities,
  };
};

const MilestoneListConnector = connect(mapStateToProps)(MilestonesList);

export default MilestoneListConnector;
