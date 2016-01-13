import React from 'react';
import Section from '../../../masters/components/Section';
import Title from '../../../masters/components/Title';
import Message from './Message';
import { FluxibleComponent } from 'fluxible-addons-react';

export default ({ id, context, title }) => (
    <Section name='body' {...{id}}>
        <div>
            <Title {...{title}} />
            <FluxibleComponent {...{context}}>
                <Message />
            </FluxibleComponent>
        </div>
    </Section>
);
