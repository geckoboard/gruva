import { connect } from 'react-redux';
import Story from './story';

const mapStateToProps = state => {
  const {
    stories: { doneVisible },
  } = state;

  return {
    doneVisible,
  };
};

const StoryConnector = connect(mapStateToProps)(Story);

export default StoryConnector;
