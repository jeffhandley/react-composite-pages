import React from 'react'
import Message from '../../../components/Message';
import messageStore from '../stores/messageStore';
import { connectToStores } from 'fluxible-addons-react';

const stores = [ messageStore ];

const mapStoresToProps = (context) => ({
    text: context.getStore(messageStore).getMessage()
});

export default connectToStores(Message, stores, mapStoresToProps);
