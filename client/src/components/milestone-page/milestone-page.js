import React from 'react';
import PropTypes from 'prop-types';
import MilestonePicker from '../milestone-picker';
import Epics from '../epics';

const MilestonePage = props => {
  const {
    match: {
      params: { milestoneId },
    },
  } = props;

  return (
    <div>
      <MilestonePicker selectedMilestoneId={milestoneId} />
      <Epics milestoneId={milestoneId} />
    </div>
  );
};

MilestonePage.propTypes = {
  match: PropTypes.object,
};

export default MilestonePage;
