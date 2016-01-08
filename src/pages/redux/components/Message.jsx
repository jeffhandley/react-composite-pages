import React from 'react'
import Message from '../../../components/Message';
import { connect } from 'react-redux'

function select(state) {
    return {
        flux: 'redux',
        message: state.message,
        source: state.source
    };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(Message);
