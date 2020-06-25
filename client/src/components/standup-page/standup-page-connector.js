import { connect } from 'react-redux';
import { toggleDoneStoriesVisibility } from '../../redux/actions';
import StandupPage from './standup-page';

const mapStateToProps = (state, ownProps) => {
  const {
    milestones: { isLoading: isLoadingMilestones },
    epics: { loadingMilestoneIds: loadingEpics },
    stories: { loadingMilestoneIds: loadingStories, doneVisible },
  } = state;
  const {
    match: {
      params: { milestoneId },
    },
  } = ownProps;

  const isLoading =
    isLoadingMilestones ||
    loadingEpics.includes(milestoneId) ||
    loadingStories.includes(milestoneId);

  return {
    isLoading,
    doneStoriesVisible: doneVisible,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleDoneStoriesVisibility: () => {
      dispatch(toggleDoneStoriesVisibility());
    },
  };
};

const StandupPageConnector = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StandupPage);

export default StandupPageConnector;
