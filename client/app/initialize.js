import { render } from 'react-dom';
import React from 'react';
import Routes from 'components/Routes'

document.addEventListener('DOMContentLoaded', () => {
  render((<Routes />), document.querySelector('#app'))
});
