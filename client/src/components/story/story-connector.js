import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateStoryEpicId } from '../../redux/actions';
import Story from './story';

const mapStateToProps = (state, ownProps) => {
  const {
    global: { currentPage },
    members,
    stories: { doneVisible },
  } = state;
  const {
    isEpicDone,
    story: { owner_ids = [] },
  } = ownProps;

  const owners = owner_ids.reduce((owners, id) => {
    const member = members.byId[id];
    if (member) {
      owners.push(member);
    }

    return owners;
  }, []);

  return {
    doneVisible: doneVisible || isEpicDone,
    currentPage,
    owners,
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
