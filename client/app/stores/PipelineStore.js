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
