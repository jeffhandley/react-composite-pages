import React, { Component } from 'react';

class Message extends Component {
    render() {
        const { flux, message, source } = this.props;

        return (
            <div>
                <div>
                    The following message is rendered through {flux}:&nbsp;
                    <span>{message}</span>
                </div>
                <div>
                    Rendered on:&nbsp;
                    <span>{source}</span>
                </div>
            </div>
        );
    }
}

Message.propTypes = {
    message: React.PropTypes.string.isRequired,
    source: React.PropTypes.string.isRequired
};

export default Message;