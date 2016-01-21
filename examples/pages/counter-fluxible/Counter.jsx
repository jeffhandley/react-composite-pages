import React from 'react';
import * as actions from './actions';

export default React.createClass({
    contextTypes: {
        executeAction: React.PropTypes.func.isRequired
    },

    propTypes: {
        increment: React.PropTypes.func.isRequired,
        value: React.PropTypes.number.isRequired
    },

    handleIncrement() {
        this.props.increment();
    },

    render() {
        return (
            <div>
                Counter Value: { this.props.value }
                <div>
                    <button onClick={ this.handleIncrement }>
                        Increment
                    </button>
                </div>
            </div>
        );
    }
});
