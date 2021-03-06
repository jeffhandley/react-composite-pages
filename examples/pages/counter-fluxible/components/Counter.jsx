import PropTypes from 'prop-types';
import React from 'react';
import ReactCreateClass from 'create-react-class';

export default ReactCreateClass({
    propTypes: {
        increment: PropTypes.func.isRequired,
        value: PropTypes.number.isRequired
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
