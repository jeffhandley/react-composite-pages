import React, { Component, PropTypes } from 'react'
import messageStore from '../stores/messageStore';
import { connectToStores } from 'fluxible-addons-react';

class Message extends Component {
    render() {
        const { text } = this.props;

        return (
            <div>
                The following message is rendered through fluxible:
                <span>{text}</span>
            </div>
        );
    }
}

Message.propTypes = {
    text: PropTypes.string.isRequired,
};

const stores = [ messageStore ];

const mapStoresToProps = (context) => ({
    text: context.getStore(messageStore).getMessage()
});

export default connectToStores(Message, stores, mapStoresToProps);
