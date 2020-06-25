import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import MilestonePicker from '../milestone-picker';
import Epics from '../epics';
import Loader from '../loader/loader';
import styles from './standup-page.css';
import MilestoneStats from '../milestone-stats';

class StandupPage extends Component {
  constructor(props) {
    super(props);

    this.handleKeypress = this.handleKeypress.bind(this);
  }

  componentDidMount() {
    this.props.init();
    document.addEventListener('keyup', this.handleKeypress);
  }

  componentWillUnmount() {
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
      <DndProvider backend={HTML5Backend}>
        <div className={styles.page}>
          <header>
            <div className={styles.titleAndLoader}>
              <MilestonePicker selectedMilestoneId={milestoneId} />
              {isLoading && <Loader />}
            </div>
            <MilestoneStats id={milestoneId} />
          </header>
          <section>
            <Epics milestoneId={milestoneId} currentPage="standup" />
          </section>
        </div>
      </DndProvider>
    );
  }
}

StandupPage.propTypes = {
  init: PropTypes.func,
  isLoading: PropTypes.bool,
  match: PropTypes.object,
  doneStoriesVisible: PropTypes.bool,
  toggleDoneStoriesVisibility: PropTypes.func,
};

export default StandupPage;
