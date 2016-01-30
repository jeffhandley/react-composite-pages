# Nested Page Templates

React-Composite-Pages encourages as layered composition pattern that makes nested page templates very easy to achieve.  The examples in the project demonstrate pages that can be rendered using different page templates, including nested templates.

## Contract

The contract in place for Server Pages is very straight-forward and similar to express middleware.

```
function loadPage(req, res, callback)
```

The `callback` will receive 2 arguments:

1. The React component
1. An object containing bound action creators for the component

This same contract applies to page templates or any other container component that needs to be rendered in a page.

```
function loadTemplate(req, res, callback)
function loadComponent(req, res, callback)
```

This powerful contract allows pages to easily render themselves in page templates that in turn render themselves in parent page templates.

## Example

In the following example, the `hello` page renders itself inside the `header` page template, and the `header` page template renders itself inside the `basic` page template.

**Server Page: `/pages/hello/index.js`**

``` jsx
import React from 'react';
import url from 'url';
import Hello from './Hello';
import template from '../../templates/header';
import { RenderContainer } from 'react-composite-pages';

export default (req, res, callback) => {
    template(req, res, (Template, templateFunctions) => {
        callback(
            React.createClass({
                render() {
                    return (
                        <Template
                            title='Hello World'
                            body={
                                <Hello to='World' />
                            }
                        />
                    );
                }
            }),
            // Expose the template's external API functions
            templateFunctions
        );
    });
}
```

**Header Page Template: `/templates/header.js`**

```jsx
import React from 'react';
import header from './components/header';
import template from './basic';
import { RenderContainer } from 'react-composite-pages';

export default (req, res, callback) => {
    // Load the Header component and its actions
    header(req, res, (Header, headerActions) => {
        // Load the parent Template and its actions
        template(req, res, (Template, templateActions) => {
            callback(
                React.createClass({
                    propTypes: {
                        body: React.PropTypes.element.isRequired
                    },

                    render() {
                        return (
                            <Template
                                // Pass props through to the parent template so
                                // additional template sections can flow through
                                { ...this.props }
                                body={
                                    <div>
                                        <Header />
                                        { /* Render the page's body below the Header component */ }
                                        { this.props.body }
                                    </div>
                                }
                            />
                        );
                    }
                }),
                // Expose both the template and header actions
                { ... templateActions, ...headerActions }
            );
        })
    })
}
```

**Basic Page Template: `/templates/basic.js`**

``` jsx
import React from 'react';
import Footer from './components/Footer';
import { RenderContainer } from 'react-composite-pages';

export default (req, res, callback) => {
    callback(
        React.createClass({
            // Define body and footer element properties for the template
            propTypes: {
                body: React.PropTypes.element.isRequired,
                footer: React.PropTypes.element,
                title: React.PropTypes.string.isRequired
            },

            getDefaultProps() {
                return {
                    footer: (
                        <div>
                            Default footer provided by the basic template
                        </div>
                    ),
                    title: 'React-Composite-Pages'
                };
            },

            render() {
                // Render the template's elements, capturing all of the
                // required state and client scripts.
                const { body, footer } = this.props;
                const template = RenderContainer.renderTemplate({ body, footer });

                // The output includes `state` and `clients` components plus
                // a `sections` object with components for each element
                // represented in the template props that were passed in.

                return (
                    <html>
                        <head>
                            <title>{ this.props.title }</title>
                        </head>
                        <body>
                            <template.sections.body />
                            <script src='/client/common.js' />
                            <template.clients />
                            <hr />
                            <template.sections.footer />
                            <Footer />
                        </body>
                    </html>
                );
            }
        })
    );
}
```

**Header Component (Server Entry Point): `/template/component/header/index.js`**

Because the Header component itself uses redux and renders universally, it has its own server and client entry points.

``` jsx
import React from 'react';
import url from 'url';
import Header from './containers/Header';
import reducers from './reducers';
import actionCreators from './actionCreators';
import { bindActionCreators, createStore } from 'redux';
import { RenderContainer } from 'react-composite-pages';

export default (req, res, callback) => {
    const { username } = url.parse(req.url, true).query;
    const store = createStore(reducers, username);
    const actions = bindActionCreators(actionCreators, store.dispatch);

    callback(
        React.createClass({
            render() {
                return (
                    <RenderContainer
                      clientSrc='/client/templates/components/header.js'
                      id='header'
                      state={store.getState()}>
                        <Header store={ store } />
                    </RenderContainer>
                );
            }
        }),
        { ...actions }
    );
}
```

**Header Component (Client Entry Point): `/templates/component/header/client.js`**

``` jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Header from './containers/Header';
import reducers from './reducers';
import { createStore } from 'redux';
import { getRenderState } from 'react-composite-pages/client';

const state = getRenderState('header');
const store = createStore(reducers, state);
const container = document.getElementById('header');

ReactDOM.render(<Header store={store} />, container);
```

## Summary

This approach illustrates how we can compose pages and templates together easily, where any component within the page can have its own flux implementation with universal rendering.  Pages, Templates, and Components all use the same contract which provides consistent and predictable usage.
