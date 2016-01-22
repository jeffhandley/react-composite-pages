import React from 'react';
import Counter from '../components/Counter';
import counterStore from '../counterStore';
import * as actions from '../actions';
import Fluxible from 'fluxible';
import { connectToStores, FluxibleComponent } from 'fluxible-addons-react';
import bindActionCreators from '../bindActionCreators';

const mapStoresToProps = (context) => {
    const { value } = context.getStore(counterStore);
    return { value };
};

const ConnectedCounter = connectToStores(Counter, [ counterStore ], mapStoresToProps);

export default React.createClass({
    propTypes: {
        context: React.PropTypes.object.isRequired
    },

    render() {
        const actionCreators = bindActionCreators(actions, this.props.context);
        const componentContext = this.props.context.getComponentContext();

        return (
            <div className='component'>
                <div className='component-header'>
                    Component: <b>Fluxible Counter</b>
                </div>
                <div className='component-note'>
                    This component uses Fluxible to provide an interactive counter.
                </div>
                <div className='component-body'>
                    <FluxibleComponent context={ componentContext }>
                        <ConnectedCounter { ...actionCreators } />
                    </FluxibleComponent>
                </div>
            </div>
        );
    }
});
