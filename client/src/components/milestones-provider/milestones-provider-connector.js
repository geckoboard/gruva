import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import MilestonesProvider from './milestones-provider';

const mapStateToProps = (state, props) => {
  const slug = props.match.params.team;

  const milestone = state.milestones.entities.find(t => t.slug === slug) || {};

  return {
    milestone: milestone.id,
  };
};

const MilestonesProviderConnector = withRouter(
  connect(mapStateToProps)(MilestonesProvider),
);

export default MilestonesProviderConnector;
