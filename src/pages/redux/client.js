import React from 'react';
import ReactDOM from 'react-dom';
import Section from '../../masters/components/Section';
import Title from '../../masters/components/Title';
import { createStore, bindActionCreators } from 'redux';
import { Provider } from 'react-redux';
import Message from './components/Message';
import reducers from './reducers';

const state = window.redux;
const container = document.getElementById('pages-redux');

const store = createStore(reducers, state);

const Component = () => (
    <Section name='body' id='pages-redux'>
        <div>
            <Title title='Redux Page' />
            <Provider {...{store}}>
                <Message />
            </Provider>
        </div>
    </Section>
);

ReactDOM.render(<Component />, container);
