import React from 'react';
import ReactDOM from 'react-dom';
import './styles.scss';

ReactDOM.render(
  <div>Kathamo&mdash; Production Ready Minimal React Boilerplate</div>,
  document.getElementById('root'),
);

if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
