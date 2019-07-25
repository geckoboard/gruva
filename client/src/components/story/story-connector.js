import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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

const StoryConnector = connect(mapStateToProps)(Story);

StoryConnector.propTypes = {
  isEpicDone: PropTypes.bool,
};

export default StoryConnector;
