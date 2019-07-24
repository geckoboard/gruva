import { connect } from 'react-redux';
import { fetchEpics } from '../../redux/actions';
import Epics from './epics';

const mapStateToProps = (state, ownProps) => {
  const {
    epics: { byMilestoneId: epics },
  } = state;
  const { milestoneId } = ownProps;

  return {
    epics: epics[milestoneId],
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchEpics: milestoneId => {
      dispatch(fetchEpics(milestoneId));
    },
  };
};

const EpicsConnector = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Epics);

export default EpicsConnector;
