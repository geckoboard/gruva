import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateStoryEpicId } from '../../redux/actions';
import Story from './story';

const mapStateToProps = (state, ownProps) => {
  const {
    stories: { doneVisible },
  } = state;
  const { isEpicDone } = ownProps;

  return {
    doneVisible: doneVisible || isEpicDone,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { story } = ownProps;
  return {
    setEpicId: epicId => {
      dispatch(
        updateStoryEpicId({
          storyId: story.id,
          previousEpicId: story.epic_id.toString(),
          newEpicId: epicId,
        }),
      );
    },
  };
};

const StoryConnector = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Story);

StoryConnector.propTypes = {
  isEpicDone: PropTypes.bool,
};

export default StoryConnector;
