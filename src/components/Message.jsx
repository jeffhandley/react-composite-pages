import React, { Component } from 'react';

class Message extends Component {
    render() {
        const { text, source } = this.props;

        return (
            <div>
                <div>
                    The following message is rendered through redux:&nbsp;
                    <span>{text}</span>
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
    text: React.PropTypes.string.isRequired,
    source: React.PropTypes.string.isRequired
};

export default Message;