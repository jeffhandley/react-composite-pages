import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import actionCreators from '../actionCreators';
import { connect, Provider } from 'react-redux';
import ReactCreateClass from 'create-react-class';

const mapStateToProps = (state) => ({
    username: state
});

const ConnectedHeader = connect(mapStateToProps, actionCreators)(Header);

export default ReactCreateClass({
    propTypes: {
        store: PropTypes.object.isRequired
    },

    render() {
        return (
            <div className='component'>
                <div className='component-header'>
                    Component: <b>Header</b>
                </div>
                <div className='component-note'>
                    This component uses redux to manage its interactions.
                    <div>
                        If you supply a querystring parameter for "username", the header
                        will show your username when rendered from the server.
                    </div>
                    <div>
                        When you sign out, your username is removed from the redux store.
                    </div>
                    <div>
                        When you sign in on the client, your username just becomes 'user'.
                    </div>
                </div>
                <div className='component-body'>
                    <Provider store={ this.props.store }>
                        <ConnectedHeader />
                    </Provider>
                </div>
            </div>
        );
    }
});
