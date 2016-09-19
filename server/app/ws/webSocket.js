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
import { Server as WebSocketServer } from 'ws';
import shortid from 'shortid';
import url from 'url';

import { AGENT, CLIENT } from '../constants/actions';

import { bus } from '../util/minibus';

export default class WebSocket {
  constructor(server) {
    this.wss = new WebSocketServer({ server: server });
    this.wss.on('connection', (ws) => this.handleConnection(ws));
  }

  handleConnection(ws) {
    let location = url.parse(ws.upgradeReq.url, true);
    let id = shortid.generate();
    if (location.path.match(/\/client/)) {
      bus.emit(CLIENT.CONNECTED, id, ws);
    } else if (location.path.match(/\/agent/)) {
      bus.emit(AGENT.CONNECTED, id, ws);
    }
  }
}
