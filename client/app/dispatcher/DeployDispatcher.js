import { Dispatcher } from 'flux';

class DeployDispatcher extends Dispatcher {
  handleViewAction(action) {
    this.dispatch({
      source: "VIEW_ACTION",
      action: action
    })
  }
}

const instance = new DeployDispatcher()
export default instance
