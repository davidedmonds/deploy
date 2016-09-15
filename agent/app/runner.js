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

import GitPullStage from './stages/gitPullStage';
import { logger } from './util/logger';

export default class Runner {
  constructor(ws) {
    this._ws = ws;
  }

  async run(pipeline) {
    try {
      logger.info('Starting to run', pipeline);
      for (let stage of pipeline.stages) {
        logger.info('Starting stage', stage.name);
        //TODO select which stage type to run here.
        let stageRunner = new GitPullStage();
        //TODO Pass log output back to the websocket.
        await stageRunner.run(pipeline, stage);
        logger.info('Stage', stage.name, 'complete');
      }
      logger.info('Run complete! Notifying server.');
      this._ws.send(JSON.stringify({ type: 'actions.agent.taskCompleted', pipeline: pipeline }));
    } catch (err) {
      logger.error(err);
    }
  }
}
