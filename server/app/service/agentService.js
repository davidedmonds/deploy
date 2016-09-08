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
import { logger } from '../util/logger';

export default class AgentService {
  constructor() {
    this._agents = {
      idle: [],
      building: []
    };
    this._buildQueue = [];
  }

  add(agent) {
    this._agents.idle.push(agent);
    logger.debug('Agents Status: ', this._agents);
  }

  remove(agent) {
    let idx = this._agents.idle.indexOf(agent);
    if (idx === -1) {
      idx = this._agents.building.indexOf(agent);
      this._agents.building.splice(idx, 1);
    } else {
      this._agents.idle.splice(idx, 1);
    }
  }

  queue(pipeline) {
    if (this._agents.idle.length === 0) {
      logger.info('Adding build to queue', JSON.stringify(pipeline));
      this._buildQueue.push(pipeline);
    } else {
      logger.info('Assigning build to agent');
      this._assignAgent(pipeline);
    }
  }

  _assignAgent(pipeline) {
    logger.debug('Sending pipeline to agent', JSON.stringify(pipeline));
    var agent = this._agents.idle.shift();
    this._agents.building.push(agent);
    agent.send(JSON.stringify(pipeline));
  }
}
