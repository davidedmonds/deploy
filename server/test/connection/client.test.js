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

import { CLIENT } from '../../app/constants/actions';

import Client from '../../app/connection/client';

import { bus } from '../../app/util/minibus';
import { logger } from '../../app/util/logger';

test('A client should send configuration information on construction', () => {
  let ws = td.object(['on', 'send']);
  new Client(ws, 'fakeId');
  td.verify(ws.send(
    JSON.stringify({ type: 'config', payload: { id: 'fakeId' } })
  ));
});

test('A client should log on all incoming messages', () => {
  let ws = td.object(['on', 'send']);
  td.replace(logger, 'debug');

  let client = new Client(ws, 'fakeId');
  client._handleMessage({ type: 'not an expected type' });

  td.verify(logger.debug('Received client message:', { type: 'not an expected type' }));
});

test('A client should log on close', () => {
  let ws = td.object(['on', 'send']);
  td.replace(bus, 'emit');
  td.replace(logger, 'debug');

  let client = new Client(ws, 'fakeId');
  client._handleClose();

  td.verify(logger.debug('Handling client disconnect...'));
});

test('A client should send an event to the event bus on close', () => {
  let ws = td.object(['on', 'send']);
  td.replace(bus, 'emit');
  td.replace(logger, 'debug');

  let client = new Client(ws, 'fakeId');
  client._handleClose();

  td.verify(bus.emit(CLIENT.DISCONNECTED, 'fakeId'));
});

test.afterEach(() => {
  td.reset();
});
