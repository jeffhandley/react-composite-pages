import React from 'react';

export default React.createClass({
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
