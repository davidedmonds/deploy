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

import DockerStage from './dockerStage';
import { logger } from '../util/logger';

export default class GitPullStage extends DockerStage {

  async runStage(pipeline, stage) {
    try {
      //TODO set a sensible version number for the runner containers.
      //TODO set output volume as part of this run so that we can capture results
      logger.trace('Starting to run stage', stage.name);
      let result = await this._docker.run('deploy-git-pull:latest', ['git', 'clone', stage.repo], process.stdout);
      logger.trace('Stage', stage.name, 'started');
      await result.container.wait();
      logger.trace('Stage', stage.name, 'complete, returning...');
      return result;
    } catch (err) {
      logger.error(err);
    }
  }
}
