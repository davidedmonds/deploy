//
// Deploy - Continuous Delivery, Faster
// Copyright (C) 2016 by David Edmonds
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
//

import React from 'react';

import Button from 'muicss/lib/react/button';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Panel from 'muicss/lib/react/panel';

import { Container } from 'flux/utils';

import PipelineStore from '../stores/PipelineStore'
import Pipelines from '../components/Pipelines'
import StageForm from '../components/StageForm'

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
