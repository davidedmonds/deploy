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

import { logger } from '../util/logger';

export default class RestServer {
  constructor(pipelineService) {
    this._pipelineService = pipelineService;

    this._server = restify.createServer();
    this._server.get('/', (req, res, next) => {
      res.send('Deploy API Server.');
      //TODO redirect to client here?
      next();
    });
    this._server.put('/pipeline/:id/launch', (req, res, next) => {
      this._pipelineService.launch(req.params.id);
      res.send(202);
      return next();
    });
  }

  start() {
    this._server.listen(8080,
      () => logger.info('%s listening on %s', this._server.name, this._server.url));
  }
}
