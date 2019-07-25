import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { sortBy } from 'lodash';
import Epic from '../epic';
import styles from './epics.css';

const sortEpics = epics => {
  return sortBy(epics.filter(epic => !epic.archived), 'position');
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
    const { epics, isLoading, milestoneId } = this.props;

    if (!isLoading && !epics.length) {
      return <div>No epics for this milestone</div>;
    }

    const sortedEpics = sortEpics(epics);

    return (
      <div className={styles.epics}>
        {sortedEpics.map((epic) => (
          <Epic
            key={epic.id}
            epic={epic}
            milestoneId={milestoneId}
          />
        ))}
      </div>
    );
  }
}

Epics.defaultProps = {
  epics: [],
};

Epics.propTypes = {
  epics: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string, name: PropTypes.string }),
  ),
  isLoading: PropTypes.bool,
  milestoneId: PropTypes.string,
  fetchData: PropTypes.func,
};

export default Epics;
