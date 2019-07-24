import { connect } from 'react-redux';
import Stories from './stories';

const mapStateToProps = (state, ownProps) => {
  const {
    stories: { byEpicId: stories, loadingMilestoneIds },
  } = state;
  const { epicId, milestoneId } = ownProps;

  return {
    isLoading: loadingMilestoneIds.includes(milestoneId),
    stories: stories[epicId],
  };
};

const StoriesConnector = connect(
  mapStateToProps,
)(Stories);

export default StoriesConnector;
