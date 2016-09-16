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

import Agent from '../../app/domain/agent';

import { bus } from '../../app/util/minibus';
import { logger } from '../../app/util/logger';

test('An agent should start idle', t => {
  let ws = td.object(['on', 'send']);
  let agent = new Agent(ws, 'fakeId');
  t.is(agent.status, IDLE);
});

test('An agent should send configuration information on construction', () => {
  let ws = td.object(['on', 'send']);
  new Agent(ws, 'fakeId');
  td.verify(ws.send(
    JSON.stringify({ type: 'config', payload: { id: 'fakeId' } })
  ));
});

test('An agent should log on all incoming messages', () => {
  let ws = td.object(['on', 'send']);
  td.replace(logger, 'debug');

  let agent = new Agent(ws, 'fakeId');
  agent._handleMessage({ type: 'not an expected type' });

  td.verify(logger.debug('Agent sent message', { type: 'not an expected type' }));
});

test('An agent should route incoming task complete messages to the event bus', () => {
  let ws = td.object(['on', 'send']);
  td.replace(bus, 'emit');
  td.replace(logger, 'debug');

  let agent = new Agent(ws, 'fakeId');
  agent._handleMessage({ type: AGENT.TASK_COMPLETED });

  td.verify(bus.emit(AGENT.TASK_COMPLETED, 'fakeId'));
});

test('An agent should log on close', () => {
  let ws = td.object(['on', 'send']);
  td.replace(bus, 'emit');
  td.replace(logger, 'debug');

  let agent = new Agent(ws, 'fakeId');
  agent._handleClose();

  td.verify(logger.debug('Handling agent disconnect...'));
});

test('An agent should send an event to the event bus on close', () => {
  let ws = td.object(['on', 'send']);
  td.replace(bus, 'emit');
  td.replace(logger, 'debug');

  let agent = new Agent(ws, 'fakeId');
  agent._handleClose();

  td.verify(bus.emit(AGENT.DISCONNECTED, 'fakeId'));
});

test.afterEach(() => {
  td.reset();
});
