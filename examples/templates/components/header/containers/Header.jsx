import React from 'react';
import Header from '../components/Header';
import actionCreators from '../actionCreators';
import { connect, Provider } from 'react-redux';

const mapStateToProps = (state) => ({
    username: state
});

const ConnectedHeader = connect(mapStateToProps, actionCreators)(Header);

export default React.createClass({
    propTypes: {
        store: React.PropTypes.object.isRequired
    },

    render() {
        return (
            <Provider store={ this.props.store }>
                <ConnectedHeader />
            </Provider>
        );
    }
});
