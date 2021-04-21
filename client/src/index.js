import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import createStore from './redux/create-store';
import MilestonesPage from './components/milestones-page';
import MilestonePage from './components/milestone-page';
import StandupPage from './components/standup-page';
import 'normalize.css';
import './index.css';
import styles from './main.css';

const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div className={styles.container}>
        <Route exact path="/" render={() => <Redirect to="/milestones" />} />
        <Route path="/milestones" component={MilestonesPage} />
        <Switch>
          <Route
            path="/milestones/:milestoneId/overview"
            component={MilestonePage}
          />
          <Route
            path="/milestones/:milestoneId/standup"
            component={StandupPage}
          />

          {/* Legacy route, keep it to redirect to new standup route */}
          <Route
            path="/milestones/:milestoneId"
            render={props => (
              <Redirect
                to={`/milestones/${props.match.params.milestoneId}/standup`}
              />
            )}
          />
        </Switch>
      </div>
    </Router>
  </Provider>,
  document.getElementById('App'),
);
