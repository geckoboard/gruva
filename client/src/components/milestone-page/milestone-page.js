import React from 'react';
import PropTypes from 'prop-types';
import MilestonePicker from '../milestone-picker';

const MilestonePage = props => {
  const { match } = props;

  return (
    <div>
      <MilestonePicker selectedMilestoneId={match.params.milestoneId} />
    </div>
  );
};

MilestonePage.propTypes = {
  match: PropTypes.object,
  milestoneId: PropTypes.string,
};

export default MilestonePage;
