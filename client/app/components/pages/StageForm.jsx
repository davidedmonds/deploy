import React from 'react';
import Input from 'muicss/lib/react/input';
import Panel from 'muicss/lib/react/panel';

export default class StageForm extends React.Component {
  render() {
    return (
      <Panel>
        <Input required="required"
               label="Stage Name"
               defaultValue={this.props.stage.name}
               onChange={this.handleNameChange} />
      </Panel>
    )
  }
}
