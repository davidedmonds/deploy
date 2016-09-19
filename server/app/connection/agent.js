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
import { BUILDING, IDLE } from '../constants/status';

import { bus } from '../util/minibus';
import { logger } from '../util/logger';

import Connection from './connection';

export default class Agent extends Connection {
  constructor(ws, id) {
    super(ws, id);
    this.send({
      type: 'config',
      payload: {
        id: id
      }
    });
    this.status = IDLE;
  }

  assign(pipeline) {
    logger.debug('Sending pipeline to agent', pipeline);
    this.status = BUILDING;
    this.send({
      type: 'task',
      payload: pipeline
    });
  }

  _handleClose() {
    logger.debug('Handling agent disconnect...');
    bus.emit(AGENT.DISCONNECTED, this.id);
  }

  _handleMessage(message) {
    logger.debug('Agent sent message', message);
    if (message.type === AGENT.TASK_COMPLETED) {
      this.status = IDLE;
      bus.emit(AGENT.TASK_COMPLETED, this.id);
    }
  }
}
