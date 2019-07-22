import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchMilestones } from '../../redux/actions';
import Milestones from './milestones';

const mapStateToProps = state => {
  const {
    milestones: { entities },
  } = state;

  return {
    milestones: entities,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    init: () => {
      dispatch(fetchMilestones());
    },
  };
};

const MilestonesConnector = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Milestones),
);

export default MilestonesConnector;
