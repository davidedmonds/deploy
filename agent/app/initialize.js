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

import restify from 'restify';
import WebSocket from 'ws';

import Agent from './agent';
import Runner from './runner';

const ws = new WebSocket('ws://172.17.0.1:8000/agent');
const runner = new Runner(ws);
const agent = new Agent(ws, runner);

ws.on('close', () => {
  console.log("Connection closed. Exiting...")
  //TODO cancel the job the agent's performing if possible.
  process.exit();
});

process.on('exit', () => ws.close());

process.on('SIGINT', () => ws.close());
