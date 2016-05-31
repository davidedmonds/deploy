import React from 'react';
import Appbar from 'muicss/lib/react/appbar';
import WebsocketIndicator from './WebsocketIndicator'

export default class Menu extends React.Component {
  render() {
    return (
      <Appbar>
        <nav className="mui--text-title">
          <span className="mui--appbar-line-height">=</span>
          <ul className="mui--appbar-line-height mui-list--inline">
            <li>Deploy</li>
            <li>Home</li>
          </ul>
          <WebsocketIndicator />
        </nav>
      </Appbar>
    );
  }
}
