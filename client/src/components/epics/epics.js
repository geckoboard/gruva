import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './epics.css';
import Epic from '../epic';

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
    const { epics, milestoneId } = this.props;

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
          <Epic key={epic.id} epic={epic} milestoneId={milestoneId} />
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
  fetchData: PropTypes.func,
};

export default Epics;
