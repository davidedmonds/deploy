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

import ClientConnection from './clientConnection';

import { AGENT, CLIENT } from '../constants/actions';

import { bus } from '../util/minibus';
import { logger } from '../util/logger';

export default class WebSocket {
  constructor(server, agentService) {
    this.agentService = agentService;
    this.wss = new WebSocketServer({ server: server });
    this.connections = { agent: new Map(), client: new Map() };
    this.wss.on('connection', (ws) => this.handleConnection(ws));

    bus.on(CLIENT.CONNECTED, this._clientConnected);
    bus.on(CLIENT.DISCONNECTED, this._clientDisconnected);
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

//TODO move this to some kind of ClientService class
  _clientConnected(id, ws) {
    let config = {
      type: 'config',
      payload: {
        id: id
      }
    };
    let conn = new ClientConnection(ws, id);
    this.connections.client.set(id, conn);
    ws.on('close', () => bus.emit(CLIENT.DISCONNECTED, id));
    conn.send(config);
  }

  _clientDisconnected(id) {
    logger.info('Closing client connection');
    this.connections.client.delete(id);
  }
}
