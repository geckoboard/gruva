import { connect } from 'react-redux';
import MilestonesPicker from './milestone-picker';

const mapStateToProps = state => {
  const {
    milestones: { entities },
  } = state;

  return {
    milestones: entities,
  };
};

const MilestonePickerConnector = connect(mapStateToProps)(MilestonesPicker);

export default MilestonePickerConnector;
