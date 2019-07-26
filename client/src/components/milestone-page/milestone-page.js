import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icons from '@fortawesome/free-solid-svg-icons';
import MilestonePicker from '../milestone-picker';
import Epics from '../epics';
import Loader from '../loader/loader';
import styles from './milestone-page.css';
import MilestoneStats from '../milestone-stats';

class MilestonePage extends Component {
  constructor(props) {
    super(props);

    this.handleKeypress = this.handleKeypress.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keyup', this.handleKeypress);
  }

  domponentWillUnmount() {
    document.removeEventListener('keyup', this.handleKeypress);
  }

  handleKeypress(event) {
    if (event.key === 's') {
      this.props.toggleDoneStoriesVisibility();
    }
  }

  render() {
    const {
      isLoading,
      match: {
        params: { milestoneId },
      },
    } = this.props;

    return (
      <div className={styles.page}>
        <header>
          <div className={styles.titleAndLoader}>
            <MilestonePicker selectedMilestoneId={milestoneId} />
            {isLoading && <Loader />}
          </div>
          <MilestoneStats id={milestoneId} />
        </header>
        <section>
          <Epics milestoneId={milestoneId} />
        </section>
      </div>
    );
  }
}

MilestonePage.propTypes = {
  isLoading: PropTypes.bool,
  match: PropTypes.object,
  doneStoriesVisible: PropTypes.bool,
  toggleDoneStoriesVisibility: PropTypes.func,
};

export default MilestonePage;
