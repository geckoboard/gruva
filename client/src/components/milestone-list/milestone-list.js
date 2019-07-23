import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

const MilestoneList = props => {
  const { match, milestones } = props;
  return (
    <ul>
      {milestones.map(({ id, name }) => {
        return (
          <li key={id}>
            <Link to={`${match.url}/${id}`}>{name}</Link>
          </li>
        );
      })}
    </ul>
  );
};

MilestoneList.propTypes = {
  match: PropTypes.object,
  milestones: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string, name: PropTypes.string }),
  ),
};

export default withRouter(MilestoneList);
