import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { sortBy } from 'lodash';
import Epic from '../epic';
import styles from './epics.css';

const sortEpics = (epics, currentPage) => {
  let sortOrder = ['started', 'completed', 'position'];

  if (currentPage === 'standup') {
    // Order by in progress, upcoming, completed
    sortOrder = [
      e => !e.started || (e.started && e.completed),
      e => e.completed,
      'position',
    ];
  }

  return sortBy(epics.filter(epic => !epic.archived), sortOrder);
};

class Epics extends Component {
  componentDidMount() {
    this.fetchData();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.milestoneId !== nextProps.milestoneId) {
      this.fetchData(nextProps.milestoneId);
    }
  }

  fetchData(milestoneId) {
    this.props.fetchData(milestoneId || this.props.milestoneId);
  }

  render() {
    const { currentPage, epics, isLoading, milestoneId } = this.props;

    if (!isLoading && !epics.length) {
      return <div>No epics for this milestone</div>;
    }

    const sortedEpics = sortEpics(epics, currentPage);

    return (
      <div className={styles.epics}>
        {sortedEpics.map(epic => (
          <Epic
            key={epic.id}
            currentPage={currentPage}
            epic={epic}
            milestoneId={milestoneId}
            currentPage={currentPage}
          />
        ))}
      </div>
    );
  }
}

Epics.defaultProps = {
  epics: [],
  currentPage: 'overview',
};

Epics.propTypes = {
  epics: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string, name: PropTypes.string }),
  ),
  isLoading: PropTypes.bool,
  milestoneId: PropTypes.string,
  fetchData: PropTypes.func,
  currentPage: PropTypes.oneOf(['overview', 'standup']),
};

export default Epics;
