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

export default class StageVisualiser extends React.Component {
  render() {
    return (
      <div className="stage-vis">
        <svg width="100%" height="100%">
          {/* TODO extract this filter */}
          <filter id="dropShadow" width="150%" height="150%">
            {/* General Glow */}
            <feComponentTransfer in="SourceAlpha">
              <feFuncA type="linear" slope="0.2"/>
            </feComponentTransfer>
            <feGaussianBlur stdDeviation="2" out="GeneralGlow"/>
            {/* Main shadow */}
            <feOffset in="SourceAlpha" dx="0" dy="2"/>
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.2"/>
            </feComponentTransfer>
            <feGaussianBlur stdDeviation="2" out="MainShadow"/>
            <feMerge>
              <feMergeNode in="GeneralGlow"/>
              <feMergeNode in="MainShadow"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          {this.props.stages.map((stage, idx) => {
            return (<g key={idx}>
              <rect x={10 + (idx * 150)} y="10" width="130" height="30" fill="#fff" filter="url(#dropShadow)"/>
              <text x={75 + (idx * 150)} y="30" textAnchor="middle">{stage.name}</text>
            </g>)
          })}
        </svg>
      </div>
    );
  }
}
