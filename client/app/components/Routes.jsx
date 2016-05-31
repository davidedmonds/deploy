import React from 'react';
import App from 'components/App';
import Overview from 'pages/Overview'
import EditPipeline from 'pages/EditPipeline'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

export default class Routes extends React.Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Overview} />
          <Route path="pipeline/edit/:name" component={EditPipeline} />
        </Route>
      </Router>
    );
  }
}
