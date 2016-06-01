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
