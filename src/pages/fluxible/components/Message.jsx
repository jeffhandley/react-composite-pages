import React from 'react'
import Message from '../../../components/Message';
import messageStore from '../stores/messageStore';
import { connectToStores } from 'fluxible-addons-react';

const stores = [ messageStore ];

const mapStoresToProps = (context) => {
    const store = context.getStore(messageStore);

    return {
        flux: 'fluxible',
        message: store.getMessage(),
        source: store.getSource()
    };
};

export default connectToStores(Message, stores, mapStoresToProps);
