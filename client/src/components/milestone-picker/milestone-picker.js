import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icons from '@fortawesome/free-solid-svg-icons';
import { categoriseMilestones } from '../../helpers';
import styles from './milestone-picker.css';

const MilestonePicker = props => {
  const { history, milestones, selectedMilestoneId } = props;

  if (!milestones.length) {
    return <div>Loading milestones...</div>;
  }

  const selectedMilestone = milestones.find(
    ({ id }) => id === selectedMilestoneId,
  );

  if (!selectedMilestone) {
    return <div>Something went wrong, can not find the milestone</div>;
  }

  const { name } = selectedMilestone;
  const categorisedMilestones = categoriseMilestones(milestones);

  const onSelect = event => {
    history.push(`/milestones/${event.target.value}`);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        {name}
        <span className={styles.caret}>
          <FontAwesomeIcon icon={icons.faCaretDown} />
        </span>
      </h2>
      <select
        tabIndex={1}
        className={styles.select}
        value={selectedMilestoneId}
        onChange={onSelect}
      >
        <optgroup label="In progress">
          {categorisedMilestones.started.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </optgroup>
        <optgroup label="To do">
          {categorisedMilestones.ready.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </optgroup>
        <optgroup label="Done">
          {categorisedMilestones.completed.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </optgroup>
      </select>
    </div>
  );
};

MilestonePicker.defaultProps = {
  milestones: [],
};

MilestonePicker.propTypes = {
  history: PropTypes.object,
  milestones: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
  ),
  selectedMilestoneId: PropTypes.string,
};

export default withRouter(MilestonePicker);
