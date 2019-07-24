import { connect } from 'react-redux';
import { fetchEpics, fetchStories } from '../../redux/actions';
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
    fetchData: milestoneId => {
      dispatch(fetchEpics(milestoneId));
      dispatch(fetchStories(milestoneId));
    },
  };
};

const EpicsConnector = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Epics);

export default EpicsConnector;
