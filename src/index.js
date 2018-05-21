import React from 'react';
import {
    render
} from 'react-dom';
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';


// import App from './containers/App';
import configureStore from './reducers/store';
import {
    Provider
} from 'react-redux';

const store = configureStore();

render( <Provider store = { store } >
          <App />
        </Provider>,
    document.getElementById('root')
);
registerServiceWorker();

