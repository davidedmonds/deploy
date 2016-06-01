import React from 'react';
import Button from 'muicss/lib/react/button';
import Pipelines from '../components/Pipelines'

export default class Overview extends React.Component {
  render() {
    return (
      <div>
        <Pipelines />
        <div className="action">
          <Button variant="fab" color="accent">+</Button>
        </div>
      </div>
    );
  }
}
