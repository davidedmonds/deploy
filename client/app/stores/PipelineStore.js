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

import { ReduceStore } from 'flux/utils'
import { CompleteState } from '../constants/DeployConstants'
import DeployDispatcher from '../dispatcher/DeployDispatcher'

var CHANGE_EVENT = "change"

class PipelineStore extends ReduceStore<Array> {
  getInitialState() {
    return [];
  }

  getPipeline(name) {
    //TODO if performance requires, make this store a map and lookup here instead
    return this._state.filter((pipeline) => {
      return pipeline.name === name
    })[0] || {stages: []};
  }

  reduce(state, action) {
    switch (action.action.type) {
      case CompleteState:
        return action.action.data.pipelines;
      default:
        console.log("Recieved Unhandled Action", action)
        return state;
    }
  }
}

const instance = new PipelineStore(DeployDispatcher);
export default instance;
