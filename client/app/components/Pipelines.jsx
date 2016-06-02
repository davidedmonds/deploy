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
import { Container } from 'flux/utils';
import { Link } from 'react-router';
import Button from 'muicss/lib/react/button';
import Panel from 'muicss/lib/react/panel';

import PipelineStore from '../stores/PipelineStore'
import StageVisualiser from '../components/StageVisualiser'

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
        this.state.pipelines.map((pipeline, idx) => {
          return (
            <Panel key={idx}>
              <h2>{pipeline.name}</h2>
              <hr/>
              <StageVisualiser stages={pipeline.stages} />
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
