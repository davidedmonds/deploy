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

import { AGENT } from '../../app/constants/actions';
import { IDLE } from '../../app/constants/status';

import Agent from '../../app/connection/agent';

import AgentService from '../../app/service/agentService';

import { bus } from '../../app/util/minibus';
import { logger } from '../../app/util/logger';

function isListeningFor(t, input) {
  td.replace(bus, 'on');
  new AgentService();
  td.verify(bus.on(input, td.matchers.isA(Function)));
}

isListeningFor.title = (title) => `The Agent Service should listen for the ${title} event`;

test('Agent Connected', isListeningFor, AGENT.CONNECTED);
test('Agent Disconnected', isListeningFor, AGENT.DISCONNECTED);
test('Agent Task Completed', isListeningFor, AGENT.TASK_COMPLETED);

test('The Agent Service should log when agents connect', () => {
  let ws = td.object(['on', 'send']);
  td.replace('../../app/connection/agent');
  let agentService = new AgentService();
  agentService.add('fakeId', ws);
  td.verify(logger.info('New agent added with id', 'fakeId'));
});

test('The Agent Service should instantiate and store an Agent handle when it connects', t => {
  let ws = td.object(['on', 'send']);
  td.replace('../../app/connection/agent');
  let agentService = new AgentService();
  agentService.add('fakeId', ws);
  t.true(agentService._agents.has('fakeId'));
});

test('The Agent Service should log when agents disconnect', () => {
  let agentService = new AgentService();
  agentService.remove('fakeId');
  td.verify(logger.info('Agent', 'fakeId', 'disconnected'));
});

test('The Agent Service should remove agents that have disconnected', t => {
  let agentService = new AgentService();
  agentService._agents.set('fakeId', { fake: 'agent' });
  agentService.remove('fakeId');
  t.false(agentService._agents.has('fakeId'));
});

test('When no agents are available, the Agent Service should store jobs for later', t => {
  let pipeline = { type: 'pipeline'};
  let agentService = new AgentService();
  agentService.queue(pipeline);
  t.false(agentService._buildQueue.indexOf(pipeline) === -1);
});

test('When no agents are available, the Agent Service should log that it is storing the job', () => {
  let pipeline = { type: 'pipeline'};
  let agentService = new AgentService();
  agentService.queue(pipeline);
  td.verify(logger.info('Adding build to queue', JSON.stringify(pipeline)));
});

test('When agents are available, the Agent Service should assign incoming pipelines to one', () => {
  let pipeline = { type: 'pipeline'};
  let agent = td.object(Agent);
  agent.status = IDLE;
  let agentService = new AgentService();
  agentService._agents.set('fakeId', agent);
  agentService.queue(pipeline);
  td.verify(agent.assign(pipeline));
});

test('When agents are available, the Agent Service should log that it is assigning the job', () => {
  let pipeline = { type: 'pipeline'};
  let agent = td.object(Agent);
  agent.status = IDLE;
  let agentService = new AgentService();
  agentService._agents.set('fakeId', agent);
  agentService.queue(pipeline);
  td.verify(logger.info('Assigning build to agent', agent));
});

test('When an agent has completed, the Agent Service should log about it', () => {
  let agent = td.object(Agent);
  agent.status = IDLE;
  let agentService = new AgentService();
  agentService._agents.set('fakeId', agent);
  agentService.taskCompleted('fakeId');
  td.verify(logger.info('Agent', 'fakeId', 'completed its task. Selecting a new one...'));
});

test('When an agent has completed, and there are queued builds, the Agent Service should assign a new job', () => {
  let pipeline = { type: 'pipeline'};
  let agent = td.object(Agent);
  agent.status = IDLE;
  let agentService = new AgentService();
  agentService._agents.set('fakeId', agent);
  agentService._buildQueue.push(pipeline);
  agentService.taskCompleted('fakeId');
  td.verify(agent.assign(pipeline));
});

test('When an agent has completed, and there are no queued builds, the Agent Service should do nothing', () => {
  let agent = td.object(Agent);
  agent.status = IDLE;
  let agentService = new AgentService();
  agentService._agents.set('fakeId', agent);
  agentService.taskCompleted('fakeId');
  td.verify(agent.assign(), { times: 0, ignoreExtraArgs: true});
});

test.beforeEach(() => {
  td.replace(logger, 'info');
  td.replace(logger, 'debug');
});

test.afterEach(() => {
  td.reset();
});
