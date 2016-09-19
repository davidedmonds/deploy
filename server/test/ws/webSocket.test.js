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

import { AGENT, CLIENT } from '../../app/constants/actions';

import { bus } from '../../app/util/minibus';

import WebSocket from '../../app/ws/webSocket';

test('The WebSocket server should emit a CLIENT.CONNECTED event when a client connects', () => {
  let ws = td.object(['on', 'send', 'upgradeReq']);
  ws.upgradeReq.url = '/client';

  let server = td.object(['once', 'on', 'url']);

  td.replace(bus, 'emit');

  let webSocket = new WebSocket(server);
  webSocket.handleConnection(ws);
  td.verify(bus.emit(CLIENT.CONNECTED, td.matchers.isA(String), ws));
});

test('The WebSocket server should emit an AGENT.CONNECTED event when an agent connects', () => {
  let ws = td.object(['on', 'send', 'upgradeReq']);
  ws.upgradeReq.url = '/agent';

  let server = td.object(['once', 'on', 'url']);

  td.replace(bus, 'emit');

  let webSocket = new WebSocket(server);
  webSocket.handleConnection(ws);
  td.verify(bus.emit(AGENT.CONNECTED, td.matchers.isA(String), ws));
});

test('The WebSocket server should not emit an event when an unhandled connection is made', () => {
  let ws = td.object(['on', 'send', 'upgradeReq']);
  ws.upgradeReq.url = '/i-am-not-a-path';

  let server = td.object(['once', 'on', 'url']);

  td.replace(bus, 'emit');

  let webSocket = new WebSocket(server);
  webSocket.handleConnection(ws);
  td.verify(bus.emit(CLIENT.CONNECTED, td.matchers.isA(String), ws), {
    times: 0,
    ignoreExtraArgs: true
  });
});

test.afterEach(() => {
  td.reset();
});
