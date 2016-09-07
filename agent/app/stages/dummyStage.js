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
import Docker from 'dockerode-promise-es6';

export default class DummyStage {
  constructor() {
    this._docker = new Docker();
  }

  async run() {
    let result = await this._docker.run('node:6-slim', ['bash', '-c', 'uname -a'], process.stdout);
    console.log('Ran in Container', result.container.id);
    // - Push the resulting container back to the registry
    try {
      await result.container.remove({});
    } catch(err) {
      console.log('Error: ', err);
    }
  }
}
