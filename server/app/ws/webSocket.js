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
import url from 'url';

import AgentConnection from './agentConnection'
import ClientConnection from './clientConnection'

export default class WebSocket {
  constructor(server, agentService) {
    this.agentService = agentService;
    this.wss = new WebSocketServer({ server: server });
    this.connections = { agent: [], client: [] };
    this.wss.on('connection', (ws) => this.handleConnection(ws));
  }

  handleConnection(ws) {
    var location = url.parse(ws.upgradeReq.url, true);
    if (location.path.match(/\/client/)) {
      var conn = new ClientConnection(ws);
      this.connections.client.push(conn);
      ws.on('close', (ws) => {
        console.log('Closing client connection')
        this.connections.client.splice(this.connections.client.indexOf(conn), 1);
      });
      conn.send('server calling out to client');
    } else if (location.path.match(/\/agent/)) {
      var conn = new AgentConnection(ws);
      this.connections.agent.push(conn);
      ws.on('close', (ws) => {
        console.log('Closing agent connection')
        this.connections.agent.splice(this.connections.agent.indexOf(conn), 1);
        this.agentService.remove(conn);
      });
      this.agentService.add(conn);
      conn.send('server calling out to agent');
    }
  }
}
