import PropTypes from 'prop-types';
import React from 'react';
import Counter from '../components/Counter';
import actionCreators from '../actionCreators';
import { connect, Provider } from 'react-redux';
import ReactCreateClass from 'create-react-class';

const mapStateToProps = (state) => ({
    value: state
});

const ConnectedCounter = connect(mapStateToProps, actionCreators)(Counter);

export default ReactCreateClass({
    propTypes: {
        store: PropTypes.object.isRequired
    },

    render() {
        return (
            <div className='component'>
                <div className='component-header'>
                    Component: <b>Redux Counter</b>
                </div>
                <div className='component-note'>
                    This component uses Redux to provide an interactive counter.
                </div>
                <div className='component-body'>
                    <Provider store={ this.props.store }>
                        <ConnectedCounter />
                    </Provider>
                </div>
            </div>
        );
    }
});
