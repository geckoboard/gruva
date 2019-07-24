import { connect } from 'react-redux';
import MilestonePage from './milestone-page';

const mapStateToProps = (state, ownProps) => {
  const {
    milestones: { isLoading: isLoadingMilestones },
    epics: { loadingMilestoneIds: loadingEpics },
    stories: { loadingMilestoneIds: loadingStories },
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
  };
};

const MilestonePageConnector = connect(mapStateToProps)(MilestonePage);

export default MilestonePageConnector;
