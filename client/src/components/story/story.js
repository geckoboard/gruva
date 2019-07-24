import React from 'react';
import PropTypes from 'prop-types';

const Story = (props) => {
  const { story } = props;
  return (
    <div>
      {story.name}
    </div>
  );
};

Story.propTypes = {
  story: PropTypes.object,
};

export default Story;
