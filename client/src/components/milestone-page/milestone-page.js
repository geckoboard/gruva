import React from 'react';
import PropTypes from 'prop-types';
import MilestonePicker from '../milestone-picker';
import Epics from '../epics';
import Loader from '../loader/loader';
import styles from './milestone-page.css';

const MilestonePage = props => {
  const {
    isLoading,
    match: {
      params: { milestoneId },
    },
  } = props;

  return (
    <div className={styles.page}>
      <header>
        <MilestonePicker selectedMilestoneId={milestoneId} />
      </header>
      <Epics milestoneId={milestoneId} />
      {isLoading && <Loader />}
    </div>
  );
};

MilestonePage.propTypes = {
  isLoading: PropTypes.bool,
  match: PropTypes.object,
};

export default MilestonePage;
