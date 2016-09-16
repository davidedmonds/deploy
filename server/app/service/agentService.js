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
import { AGENT } from '../constants/actions';
import { IDLE } from '../constants/status';

import Agent from '../domain/agent';

import { bus } from '../util/minibus';
import { logger } from '../util/logger';

export default class AgentService {
  constructor() {
    this._agents = new Map();
    this._buildQueue = [];
    bus.on(AGENT.CONNECTED, (id, ws) => this.add(id, ws));
    bus.on(AGENT.DISCONNECTED, (id) => this.remove(id));
    bus.on(AGENT.TASK_COMPLETED, (id) => this.taskCompleted(id));
  }

  add(id, ws) {
    logger.info('New agent added with id', id);
    let conn = new Agent(ws, id);
    this._agents.set(id, conn);
  }

  remove(id) {
    logger.info('Agent', id, 'disconnected');
    this._agents.delete(id);
  }

  queue(pipeline) {
    let agent = [...this._agents]
      .map(([, agent]) => agent)
      .filter((agent) => agent.status === IDLE)
      .shift();
    if (agent === undefined) {
      logger.info('Adding build to queue', JSON.stringify(pipeline));
      this._buildQueue.push(pipeline);
    } else {
      logger.info('Assigning build to agent', agent);
      agent.assign(pipeline);
    }
  }

  taskCompleted(id) {
    logger.info('Agent', id, 'completed its task. Selecting a new one...');
    let pipeline = this._buildQueue.shift();
    if (pipeline !== undefined) {
      this.queue(pipeline);
    }
  }
}
