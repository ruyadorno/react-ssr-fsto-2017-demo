import React from 'react';
import { render } from 'react-dom';
import domLoaded from 'when-dom-ready';
import 'semantic-ui-css/semantic.min.css';

import LibList from './Home/LibList';

const client = {
  'LibList': LibList
};

window.bindComponent = {
  render(ref) {
    domLoaded().then(() => {
      const Component = client[ref];
      render(<Component { ...window.store }/>, document.querySelector(`[data-component=${ref}]`));
    });
  }
};

if (module.hot) {
  module.hot.accept();
}
