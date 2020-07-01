import { connect } from 'react-redux';
import StoriesByWorkflow from './stories-by-workflow';

const mapStateToProps = (state, ownProps) => {
  const {
    stories: { byEpicId: stories, loadingMilestoneIds },
    workflows: { statesByProjectId },
  } = state;
  const { epicId, milestoneId } = ownProps;

  return {
    isLoading: loadingMilestoneIds.includes(milestoneId),
    stories: stories[epicId],
    workflowStates: statesByProjectId,
  };
};

const StoriesByWorkflowConnector = connect(mapStateToProps)(StoriesByWorkflow);

export default StoriesByWorkflowConnector;
