import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, bindActionCreators } from 'redux';
import { Provider } from 'react-redux';
import Message from './components/Message';
import reducers from './reducers';

const state = window.PAGE_STATE;
const container = document.getElementById('pages-redux');

const store = createStore(reducers, state);

const Component = () => (
    <Provider {...{store}}>
        <Message source='client' />
    </Provider>
);

ReactDOM.render(<Component />, container);
