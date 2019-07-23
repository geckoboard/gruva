import { connect } from 'react-redux';
import { fetchMilestones } from '../../redux/actions';
import MilestonesPage from './milestones-page';

const mapDispatchToProps = dispatch => {
  return {
    init: () => {
      dispatch(fetchMilestones());
    },
  };
};

const MilestonesPageConnector = connect(
  undefined,
  mapDispatchToProps,
)(MilestonesPage);

export default MilestonesPageConnector;
