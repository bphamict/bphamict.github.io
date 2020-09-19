import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { FacebookProvider } from 'react-facebook';

import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './Redux/store';
import { FB_APP_ID } from './Configs';

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <FacebookProvider appId={FB_APP_ID}>
      <Suspense fallback={() => {}}>
        <App />
      </Suspense>
    </FacebookProvider>
  </Provider>,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
