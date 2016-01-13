import React from 'react'
import Message from '../../../components/Message';
import messageStore from '../stores/messageStore';
import { connectToStores, provideContext } from 'fluxible-addons-react';

const stores = [ messageStore ];

const mapStoresToProps = (context) => {
    const { message, source } = context.getStore(messageStore);

    return {
        flux: 'fluxible',
        message,
        source
    };
};

export default provideContext(
    connectToStores(Message, stores, mapStoresToProps)
);
