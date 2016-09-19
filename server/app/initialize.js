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

import r from 'rethinkdbdash';

import DbSchema from './db/dbSchema';
import PipelineDb from './db/pipelineDb';

import RestServer from './rest/restServer';

import AgentService from './service/agentService';
import PipelineService from './service/pipelineService';

import WebSocket from './ws/webSocket';

const db = r({
  servers: [ { host: '172.17.0.1', port:28015 } ]
});

DbSchema(db);

const pipelineDb = new PipelineDb(db);

const agentService = new AgentService();
const pipelineService = new PipelineService(agentService, pipelineDb);

const rs = new RestServer(pipelineService);
new WebSocket(rs._server);

rs.start();
