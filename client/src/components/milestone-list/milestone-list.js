import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { categoriseMilestones } from '../../helpers';
import styles from './milestone-list.css';

const MilestoneList = props => {
  const { match, milestones } = props;
  const categorisedMilestones = categoriseMilestones(milestones);

  return (
    <div className={styles.list}>
      <div>
        <h2>In progress</h2>
        <ul>
          {categorisedMilestones.started.map(({ id, name }) => {
            return (
              <li key={id}>
                <Link to={`${match.url}/${id}`}>{name}</Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <h2>To do</h2>
        <ul>
          {categorisedMilestones.ready.map(({ id, name }) => {
            return (
              <li key={id}>
                <Link to={`${match.url}/${id}`}>{name}</Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <h2>Done</h2>
        <ul>
          {categorisedMilestones.completed.map(({ id, name }) => {
            return (
              <li key={id}>
                <Link to={`${match.url}/${id}`}>{name}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

MilestoneList.propTypes = {
  match: PropTypes.object,
  milestones: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string, name: PropTypes.string }),
  ),
};

export default withRouter(MilestoneList);
