import { connect } from 'react-redux';
import {
  fetchMembers,
  fetchMilestones,
  fetchWorkflows,
} from '../../redux/actions';
import MilestonesPage from './milestones-page';

const mapDispatchToProps = dispatch => {
  return {
    init: () => {
      dispatch(fetchMilestones());

      dispatch(fetchMembers());
      dispatch(fetchWorkflows()); // maybe just fetch this on standup page
    },
  };
};

const MilestonesPageConnector = connect(
  undefined,
  mapDispatchToProps,
)(MilestonesPage);

export default MilestonesPageConnector;
