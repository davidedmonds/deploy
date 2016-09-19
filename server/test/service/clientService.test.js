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

import ClientService from '../../app/service/clientService';

import { bus } from '../../app/util/minibus';
import { logger } from '../../app/util/logger';

function isListeningFor(t, input) {
  td.replace(bus, 'on');
  new ClientService();
  td.verify(bus.on(input, td.matchers.isA(Function)));
}

isListeningFor.title = (title) => `The Client Service should listen for the ${title} event`;

test('Client Connected', isListeningFor, CLIENT.CONNECTED);
test('Client Disconnected', isListeningFor, CLIENT.DISCONNECTED);

test('The Client Service should log when clients connect', () => {
  let ws = td.object(['on', 'send']);
  td.replace('../../app/connection/client');
  let clientService = new ClientService();
  clientService.add('fakeId', ws);
  td.verify(logger.info('New agent added with id', 'fakeId'));
});

test('The Client Service should instantiate and store an Client handle when it connects', t => {
  let ws = td.object(['on', 'send']);
  td.replace('../../app/connection/client');
  let clientService = new ClientService();
  clientService.add('fakeId', ws);
  t.true(clientService._clients.has('fakeId'));
});

test('The Client Service should log when clients disconnect', () => {
  let clientService = new ClientService();
  clientService.remove('fakeId');
  td.verify(logger.info('Client', 'fakeId', 'disconnected'));
});

test('The Client Service should remove clients that have disconnected', t => {
  let clientService = new ClientService();
  clientService._clients.set('fakeId', { fake: 'agent' });
  clientService.remove('fakeId');
  t.false(clientService._clients.has('fakeId'));
});

test.beforeEach(() => {
  td.replace(logger, 'info');
  td.replace(logger, 'debug');
});

test.afterEach(() => {
  td.reset();
});
