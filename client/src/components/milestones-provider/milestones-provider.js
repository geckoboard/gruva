import PropTypes from 'prop-types';

const MilestonesProvider = ({ children, milestones }) => children(milestones);

MilestonesProvider.propTypes = {
  children: PropTypes.func,
  milestones: PropTypes.number,
};

export default MilestonesProvider;
