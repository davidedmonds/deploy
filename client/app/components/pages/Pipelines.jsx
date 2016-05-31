import React from 'react';
import { Container } from 'flux/utils';
import { Link } from 'react-router';
import Button from 'muicss/lib/react/button';
import Panel from 'muicss/lib/react/panel';

import PipelineStore from '../../stores/PipelineStore'

class Pipelines extends React.Component {
  static getStores() {
    return [PipelineStore]
  }

  static calculateState(prevState) {
    return {
      pipelines: PipelineStore.getState()
    }
  }

  render() {
    return (
      <div>{
        this.state.pipelines.map(function(pipeline, idx) {
          return (
            <Panel key={idx}>
              <h2>{pipeline.name}</h2>
              <hr/>
              <hr/>
              <Link to={"/pipeline/edit/" + pipeline.name}>
                <Button color="primary">Edit Pipeline</Button>
              </Link>
            </Panel>
          )
        })
      }</div>
    )
  }
}

const PipelinesContainer = Container.create(Pipelines)
export default PipelinesContainer
