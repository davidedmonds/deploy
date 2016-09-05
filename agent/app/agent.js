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

export default class Agent {
  constructor(ws) {
    this.ws = ws;
    this.ws.on('open', () => this.open());
    this.ws.on('message', (data, flags) => this.message(data, flags));
  }

  open() {
    this.ws.send('Agent Checking In');
  }

  message(data, flags) {
    console.log("Incoming message:", data);
  }
}
