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
