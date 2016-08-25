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

import React from 'react';
import DeployDispatcher from '../dispatcher/DeployDispatcher'

export default class WebsocketIndicator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {connected: false}
  }

  componentDidMount() {
    //TODO move this into a store eventually
    var websocket = new WebSocket("ws://localhost:54321/client")
    
    websocket.onopen = event => {
      this.setState({connected: true})
    };
    websocket.onmessage = event => {
      console.log(event.data)
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
