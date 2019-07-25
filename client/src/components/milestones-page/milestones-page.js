import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import MilestoneList from '../milestone-list';
import styles from './milestones-page.css';

class MilestonesPage extends Component {
  componentDidMount() {
    this.props.init();
  }

  renderPage() {
    return (
      <div className={styles.page}>
        <h1>Milestones</h1>
        <MilestoneList />
      </div>
    );
  }

  render() {
    const { match } = this.props;
    return (
      <div>
        <Route exact path={match.path} render={this.renderPage} />
      </div>
    );
  }
}

MilestonesPage.propTypes = {
  match: PropTypes.object,
  init: PropTypes.func,
};

export default MilestonesPage;
