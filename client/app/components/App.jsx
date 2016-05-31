import React from 'react';
import Container from 'muicss/lib/react/container';

import Menu from './Menu'
import Footer from './Footer'
import Overview from './pages/Overview'

export default class App extends React.Component {
  render() {
    return (
      <div id="content">
        <Menu />
        <Container fluid={true}>
          {this.props.children}
        </Container>
        <Container fluid={true}>
          <Footer />
        </Container>
      </div>
    );
  }
}
