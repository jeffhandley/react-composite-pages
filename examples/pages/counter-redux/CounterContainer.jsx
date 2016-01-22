import React from 'react';
import Counter from './Counter';
import actionCreators from './actionCreators';
import { connect, Provider } from 'react-redux';

const mapStateToProps = (state) => ({
    value: state
});

const ConnectedCounter = connect(mapStateToProps, actionCreators)(Counter);

export default React.createClass({
    propTypes: {
        store: React.PropTypes.object.isRequired
    },

    render() {
        return (
            <Provider store={ this.props.store }>
                <ConnectedCounter />
            </Provider>
        );
    }
});
