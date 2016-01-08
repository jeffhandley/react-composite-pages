import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

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
    text: PropTypes.string.isRequired,
};

function select(state) {
    return {
        text: state.text
    };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(Message);
