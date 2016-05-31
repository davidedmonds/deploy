import React from 'react';
import DeployDispatcher from '../dispatcher/DeployDispatcher'

export default class WebsocketIndicator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {connected: false}
  }

  componentDidMount() {
    var websocket = new WebSocket("ws://localhost:8025/client")
    websocket.onopen = event => {
      this.setState({connected: true})
    };
    websocket.onmessage = event => {
      DeployDispatcher.handleViewAction(JSON.parse(event.data))
    }
    websocket.onerror = () => {
      console.log(arguments);
    }
  }

  render() {
    return (
      <span className="mui--appbar-line-height">
        {this.state.connected ? "Connected" : "Disconnected" }
      </span>
    );
  }
}
