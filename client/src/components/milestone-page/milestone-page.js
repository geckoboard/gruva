import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icons from '@fortawesome/free-solid-svg-icons';
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
    doneStoriesVisible,
    toggleDoneStoriesVisibility,
  } = props;

  const toggleButtonText = doneStoriesVisible
    ? 'Hide completed'
    : 'Show completed';

  return (
    <div className={styles.page}>
      <header>
        <div className={styles.titleAndLoader}>
          <MilestonePicker selectedMilestoneId={milestoneId} />
          {isLoading && <Loader />}
        </div>
        <button
          onClick={toggleDoneStoriesVisibility}
          className={styles.toggleDoneButton}
        >
          {toggleButtonText} <FontAwesomeIcon icon={icons.faFileAlt} />{' '}
        </button>
      </header>
      <section>
        <Epics milestoneId={milestoneId} />
      </section>
    </div>
  );
};

MilestonePage.propTypes = {
  isLoading: PropTypes.bool,
  match: PropTypes.object,
  doneStoriesVisible: PropTypes.bool,
  toggleDoneStoriesVisibility: PropTypes.func,
};

export default MilestonePage;
