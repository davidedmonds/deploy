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
import { Container as FluxContainer } from 'flux/utils';
import { Link } from 'react-router';
import Button from 'muicss/lib/react/button';
import Panel from 'muicss/lib/react/panel';
import Container from 'muicss/lib/react/container';
import Row from 'muicss/lib/react/row';
import Col from 'muicss/lib/react/col';

import PipelineStore from '../stores/PipelineStore';
import StageVisualiser from '../components/StageVisualiser';

class Pipelines extends React.Component {
  static getStores() {
    return [PipelineStore];
  }

  static calculateState() {
    return {
      pipelines: PipelineStore.getState()
    };
  }

  render() {
    return (
      <div>{
        this.state.pipelines.map((pipeline, idx) => {
          return (
            <Panel key={idx}>
              <Container fluid={true}>
                <Row>
                  <Col md="6"><h2>{pipeline.name}</h2></Col>
                  <Col md="6"><h2 className="version">{pipeline.version}</h2></Col>
                </Row>
              </Container>
              <hr/>
              <StageVisualiser stages={pipeline.stages} triggers={pipeline.triggers} />
              <hr/>
              <Link to={'/pipeline/edit/' + pipeline.name}>
                <Button color="primary">Edit Pipeline</Button>
              </Link>
            </Panel>
          );
        })
      }</div>
    );
  }
}

const PipelinesContainer = FluxContainer.create(Pipelines);
export default PipelinesContainer;
