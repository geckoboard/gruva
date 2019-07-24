import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './epics.css';

class Epics extends Component {
  componentDidMount() {
    this.fetchEpics();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.milestoneId !== nextProps.milestoneId) {
      this.fetchEpics(nextProps.milestoneId);
    }
  }

  fetchEpics(milestoneId) {
    this.props.fetchEpics(milestoneId || this.props.milestoneId);
  }

  render() {
    const { epics } = this.props;

    if (!epics) {
      return <div>Loading epics...</div>;
    }

    if (!epics.length) {
      return <div>No epics for this milestone</div>;
    }

    return (
      <div className={styles.epics}>
        <h3>Epics</h3>
        {epics.map(epic => (
          <h4 key={epic.id}>{epic.name}</h4>
        ))}
      </div>
    );
  }
}

Epics.propTypes = {
  epics: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string, name: PropTypes.string }),
  ),
  milestoneId: PropTypes.string,
  fetchEpics: PropTypes.func,
};

export default Epics;
