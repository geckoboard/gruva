import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import createStore from './redux/create-store';
import Milestones from './components/milestones';
import 'normalize.css';
import './index.css';

const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router>
        <Route path="/milestones" component={Milestones} />
      </Router>
    </div>
  </Provider>,
  document.getElementById('App'),
);
