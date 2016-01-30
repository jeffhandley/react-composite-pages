# Usage With Fluxible

React-Composite-Pages allows you to very easily compose Fluxible-driven components into pages.  Beyond the Hello World example, only a few additions need to be made.

1. Introduce your stores and actions
1. Introduce a Container component that wraps Fluxible around your Presentational component
1. Create and configure the Fluxible app in both the server and client
1. Bind your actions for exposure on the component's external API

The example below creates a Counter page that allows the user to click a button to increment the counter.  Additionally, a querystring value is read on the server to initialize the state of the counter.

**Constants: `constants.js`**

``` js
export default {
    SET_VALUE: 'SET_VALUE',
    INCREMENT: 'INCREMENT'
};
```

**Store: `counterStore.js`**

``` js
import { createStore } from 'fluxible/addons';
import constants from './constants';

export default createStore({
    storeName: 'Counter',

    handlers: {
        [constants.SET_VALUE]: 'setValue',
        [constants.INCREMENT]: 'increment'
    },

    setValue(value = 0) {
        this.value = value;
        this.emitChange();
    },

    increment(count = 1) {
        this.value += count;
        this.emitChange();
    },

    dehydrate() {
        return {
            value: this.value
        };
    },

    rehydrate(state) {
        this.value = state.value;
    }
});
```

**Actions: `actions.js`**

``` js
import constants from './constants';

export function setValue(actionContext, { value }, done) {
    actionContext.dispatch(constants.SET_VALUE, value);
    done();
}

export function increment(actionContext, { count }, done) {
    actionContext.dispatch(constants.INCREMENT, count);
    done();
}
```

**Presentational Component: `components/Counter.jsx`**

``` jsx
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
```

**Container Component: `containers/Counter.jsx`**

``` jsx
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
            <FluxibleComponent context={ componentContext }>
                <ConnectedCounter { ...actionCreators } />
            </FluxibleComponent>
        );
    }
});
```

**Server Page: `index.js`**

``` jsx
import React from 'react';
import url from 'url';
import Counter from './containers/Counter';
import counterStore from './counterStore';
import * as actions from './actions';
import template from '../../templates/basic';
import Fluxible from 'fluxible';
import bindActionCreators from './bindActionCreators';
import { RenderContainer } from 'react-composite-pages';

export default (req, res, callback) => {
    const { to = 0 } = url.parse(req.url, true).query;

    const app = new Fluxible();
    app.registerStore(counterStore);

    const context = app.createContext();
    const actionCreators = bindActionCreators(actions, context);

    actionCreators.setValue({ value: Number(to) }, () => {
        template(req, res, (Template, templateActions) => {
            callback(
                React.createClass({
                    render() {
                        const state = app.dehydrate(context);

                        return (
                            <Template
                              title='Fluxible Counter'
                              body={
                                <RenderContainer
                                  clientSrc='/client/pages/counter-fluxible.js'
                                  id='counter-fluxible'
                                  state={ state }>
                                    <Counter context={ context } />
                                </RenderContainer>
                              }
                            />
                        );
                    }
                }),
                { ...templateActions, ...actionCreators }
            );
        });
    });
}
```

**Client Entry Point: `client.js`**

``` jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './containers/Counter';
import counterStore from './counterStore';
import Fluxible from 'fluxible';
import { getRenderState } from 'react-composite-pages/client';

const state = getRenderState('counter-fluxible');

const app = new Fluxible();
app.registerStore(counterStore);

const container = document.getElementById('counter-fluxible');

app.rehydrate(state, (err, context) => {
    ReactDOM.render(<Counter context={ context } />, container);
});
```
