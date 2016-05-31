import React from 'react';
import Button from 'muicss/lib/react/button';
import Pipelines from './Pipelines'

export default class Overview extends React.Component {
  render() {
    return (
      <div>
        <Pipelines />
        <div className="action">
          <Button variant="fab" color="primary">+</Button>
        </div>
      </div>
    );
  }
}
