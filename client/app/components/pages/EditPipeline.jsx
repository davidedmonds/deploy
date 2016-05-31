import React from 'react';

import Button from 'muicss/lib/react/button';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Panel from 'muicss/lib/react/panel';

import { Container } from 'flux/utils';

import PipelineStore from '../../stores/PipelineStore'
import Pipelines from './Pipelines'
import StageForm from './StageForm'

class EditPipeline extends React.Component {
  static getStores() {
    return [PipelineStore]
  }

  static calculateState(prevState, props) {
    return {
      pipeline: PipelineStore.getPipeline(props.params.name)
    }
  }

  addStage(e) {
    e.preventDefault();
    this.setState({stages: this.state.pipeline.stages.concat([{}])})
  }

  render() {
    return (
      <Panel>
        <Form>
          <Input required="required"
                 label="Pipeline Name"
                 defaultValue={this.state.pipeline.name || this.props.params.name} />
           <div id="stages">{this.state.pipeline.stages.map(function(stage, idx) {
             return (
               <StageForm stage={stage} key={idx} />
             )
           }.bind(this))}</div>
           <Button color="primary" onClick={this.addStage.bind(this)}>
             Add Stage
           </Button>
          <hr/>
          <Button color="primary">Save Pipeline</Button>
        </Form>
      </Panel>
    );
  }
}

const EditPipelineContainer = Container.create(EditPipeline, {pure: false, withProps: true})
export default EditPipelineContainer
