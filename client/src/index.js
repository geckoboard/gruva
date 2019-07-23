import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import createStore from './redux/create-store';
import MilestonesPage from './components/milestones-page';
import MilestonePage from './components/milestone-page';
import 'normalize.css';
import './index.css';
import styles from './main.css';

const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <div className={styles.container}>
      <Router>
        <div>
          <Route path="/milestones" component={MilestonesPage} />
          <Route path="/milestones/:milestoneId" component={MilestonePage} />
        </div>
      </Router>
    </div>
  </Provider>,
  document.getElementById('App'),
);
