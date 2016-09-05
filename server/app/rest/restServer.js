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

export default class RestServer {
  constructor(pipelineService) {
    this.pipelineService = pipelineService;
    
    this.server = restify.createServer();
    this.server.get('/', (req, res, next) => {
      console.log("I ARE GET /");
      res.send('WOOP');
      next();
    });
    this.server.put('/pipeline/:id/launch', (req, res, next) => {
      this.pipelineService.launch(req.params.id);
      res.send(202);
      return next();
    })
  }

  start() {
    this.server.listen(8080,
      () => console.log('%s listening on %s', this.server.name, this.server.url));
  }
}