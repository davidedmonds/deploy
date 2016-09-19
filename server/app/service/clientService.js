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
import { CLIENT } from '../constants/actions';

import Client from '../connection/client';

import { bus } from '../util/minibus';
import { logger } from '../util/logger';

export default class ClientService {
  constructor() {
    this._clients = new Map();
    this._buildQueue = [];
    bus.on(CLIENT.CONNECTED, (id, ws) => this.add(id, ws));
    bus.on(CLIENT.DISCONNECTED, (id) => this.remove(id));
  }

  add(id, ws) {
    logger.info('New agent added with id', id);
    let conn = new Client(ws, id);
    this._clients.set(id, conn);
  }

  remove(id) {
    logger.info('Client', id, 'disconnected');
    this._clients.delete(id);
  }
}
