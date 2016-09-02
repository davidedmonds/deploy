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

export default class AgentService {
  constructor() {
    this.buildQueue = [];
    this.agents = {
      idle: [],
      building: []
    }
  }

  add(agent) {
    this.agents.idle.push(agent);
    console.log('Agents Status: ', this.agents);
  }

  queue(pipeline) {
    if (this.agents.idle.length === 0) {
      console.log('Adding build to queue');
      this.buildQueue.push(pipeline);
    } else {
      console.log('Assigning build to agent')
      this._assignAgent(pipeline);
    }
  }

  _assignAgent(pipeline) {
    console.log('Sending pipeline to agent', JSON.stringify(pipeline));
    var agent = this.agents.idle.shift();
    this.agents.building.push(agent);
    agent.connection.send(JSON.stringify(pipeline));
  }
}
