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

import DummyStage from './stages/dummyStage'

export default class Runner {
  constructor(ws) {
    this._ws = ws;
  }

  async run(pipeline) {
    try {
      console.log('Starting to run', pipeline);
      for (let stage of pipeline.stages) {
        console.log('Starting stage', stage.name);
        //TODO select which stage type to run here.
        let stageRunner = new DummyStage();
        //TODO Pass log output back to the websocket.
        await stageRunner.run();
        console.log('Stage', stage.name, 'complete');
      }
      console.log('Run complete! Notifying server.');
      this._ws.send(JSON.stringify({ type: "agent-complete", pipeline: pipeline }));
    } catch (err) {
      console.error("ERROR:", err);
    }
  }
}
