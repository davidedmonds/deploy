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

import test from 'ava';
import td from 'testdouble';

import PipelineService from '../../app/service/pipelineService';

import { logger } from '../../app/util/logger';

test('The Pipeline Service should log when pipelines are launched', () => {
  let agentService = td.object(['queue']);
  let pipelineDb = td.object(['getById']);
  let pipelineService = new PipelineService(agentService, pipelineDb);
  pipelineService.launch('fakeId');
  td.verify(logger.info('Launching pipeline with id', 'fakeId'));
});

test('When pipelines are launched, the Pipeline Service should retrieve the pipeline from the DB and hand it to the AgentService', async () => {
  let agentService = td.object(['queue']);
  let pipelineDb = td.object(['getById']);
  let pipeline = {};
  td.when(pipelineDb.getById('fakeId')).thenResolve(pipeline);
  let pipelineService = new PipelineService(agentService, pipelineDb);
  await pipelineService.launch('fakeId');
  td.verify(agentService.queue(pipeline));
});

test.beforeEach(() => {
  td.replace(logger, 'info');
  td.replace(logger, 'debug');
});

test.afterEach(() => {
  td.reset();
});
