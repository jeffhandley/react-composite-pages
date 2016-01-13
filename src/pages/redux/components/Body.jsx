import React from 'react';
import Section from '../../../masters/components/Section';
import Title from '../../../masters/components/Title';
import Message from './Message';
import { Provider } from 'react-redux';

export default ({ id, store, title }) => (
    <Section name='body' {...{id}}>
        <div>
            <Title {...{title}} />
            <Provider {...{store}}>
                <Message />
            </Provider>
        </div>
    </Section>
);
