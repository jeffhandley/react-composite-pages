# React-Composition

A common pattern with React is to separate your Presentational Components from Container Components.  This is highlighted within the [Redux documentation](http://rackt.org/redux/docs/basics/UsageWithReact.html#container-and-presentational-components).

There are many scenarios for composing multiple React Container Components together onto a single page; including:

1. Interactive navigation components and other common controls
1. Dashboard screens that comprise many independent sections
1. Composition of components using different flux implementations (or versions)

React-Composition provides components and patterns to help you expose your Container Components for drop-in consumption.  As a by-product, React-Composition provides a straight-forward approach to creating layered page templates for universal rendering of the composed Container Components.

## Usage

On the server, you will wrap your Container Components in functions that allow for simple async consumption, rendering the Container Components within a `RenderContainer` that aides in universal rendering through page templates.

On the client, you will load up the rendered state and initialize client-side rendering through a basic client bundle.

Here's a bare-bones Hello World example (that does not utilize a flux/redux implementation).

**Presentational Component: `pages/hello/Hello.jsx`**

``` jsx
import React from 'react';

export default React.createClass({
    propTypes: {
        to: React.PropTypes.string.isRequired
    },

    render() {
        return (
            <span>Hello {this.props.to}</span>
        );
    }
});
```

**Container Component (Server): `pages/hello/index.js`**

``` jsx
import React from 'react';
import url from 'url';
import Hello from './Hello';
import loadTemplate from '../../templates/full-page';
import { RenderContainer } from 'react-composition';

export default (req, callback) => {
    // This could be an async data fetching operation
    const { to = "World" } = url.parse(req.url, true).query;

    // This could be the creation of a flux/redux store
    const state = { hello: { to }};

    // Load the Template Container Component using this same approach
    loadTemplate(req, (Template, templateFunctions) => {
        // Render ourselves inside the loaded Template
        // Specify both a body and a footer for the template
        callback(
            React.createClass({
                render() {
                    return (
                        <Template
                            body={
                                // The body supports universal rendering
                                // It is wrapped in a RenderContainer to
                                // configure its required client script,
                                // initial state, and container element id.
                                <RenderContainer
                                  clientSrc='/client/pages/hello.js'
                                  id='hello-container'
                                  state={state}>
                                    <Hello to={to} />
                                </RenderContainer>
                            }
                            footer={
                                // The footer doesn't use universal rendering
                                // It will be rendered as static HTML
                                <span>It's nice to see you again!</span>
                            }
                        />
                    );
                }
            }),
            // Expose the template's external API functions through ours
            templateFunctions
        );
    });
}
```

**Page Template: `templates/full-page/index.js`**

``` jsx
import React from 'react';
import RenderContainer from '../../components/RenderContainer';

export default (req, callback) => {
    // We could perform async operations for loading the template
    callback(
        React.createClass({
            // Define body and footer element properties for the template
            propTypes: {
                body: React.PropTypes.element.isRequired,
                footer: React.PropTypes.element
            },

            render() {
                // Render the template's elements, capturing all of the
                // required state and client scripts.
                const template = RenderContainer.renderTemplate(this.props);

                // The output includes `state` and `clients` components plus
                // a `sections` object with components for each element
                // represented in the template props that were passed in.

                return (
                    <html>
                        <head>
                            <title>Hello World</title>
                        </head>
                        <body>
                            <template.sections.body />
                            <template.state />
                            <template.clients />
                            <hr />
                            <template.sections.footer />
                        </body>
                    </html>
                );
            }
        })
    );
}
```

**Container Component (Client): `pages/hello/client.js`**

This is the client-side bundle entry point for the 'hello' page.

``` jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Hello from './Hello';
import { getRenderState } from 'react-composition/client';

// This is the id used for the <RenderContainer> on the server
const containerId = 'hello-container';

// Get the rendered state for this container component
const state = getRenderState(containerId);
const container = document.getElementById(containerId);

// We could perform any flux/redux initialization here before rendering

ReactDOM.render(
    <Hello to={state.to} />,
    container
);
```

**Server: `server.js`**

``` jsx
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

const app = express();

// Build process produces client-side page bundles in lib/client
app.use('/client', express.static('lib/client'));

app.get('/hello', (req, res, next) => {
    const { default: loadPage } = require('./pages/hello');

    loadPage(req, (Page, pageActions) => {
        res.send(ReactDOMServer.renderToStaticMarkup(<Page />));
    });
});

const server = app.listen(3000, () => {
    console.log('Listening on port 3000');
});
```

## Rendered HTML

The server is using `ReactDOMServer.renderToStaticMarkup()` to render the `<Page />` that was loaded.  This allows the `<html>` tag and other elements from the page template to be rendered as static HTML rather than with react attributes.

However, if we examine the output for this page, we'll see that react attributes are applied to each element that was within a `<RenderContainer>`.

``` html
<html>
<head>
  <title>Hello World</title>
</head>
<body>
  <div>
    <div>
      <div id="hello-container"><span data-reactid=".upsep0qubk" data-react-checksum="1638870632"><span data-reactid=".upsep0qubk.0">Hello </span><span data-reactid=".upsep0qubk.1">Jeff</span></span>
      </div>
      <noscript></noscript>
      <noscript></noscript>
    </div>
  </div>
  <script>
    window.RenderState = {
      "hello-container": {
        "hello": {
          "to": "World"
        }
      }
    };
  </script>
  <div>
    <script src="/client/pages/hello.js"></script>
  </div>
  <hr/>
  <div><span>It&#x27;s nice to see you again!</span></div>
</body>
</html>
```

This happens because the `RenderContainer` renders its own children using `ReactDOMServer.renderToString()` and wraps that React-enabled markup in a `<div>`.  In the example above, we see `<div id="hello-container">` that corresponds to the `<RenderContainer>`.

This approach ensures that each Container Component can perform client-side rendering cleanly, gaining a flicker-free initial render, and no warnings about rendering React components into elements that themselves were rendered from React.

## Advanced Topics (TO BE WRITTEN)

1. Usage with Redux
1. Usage with Fluxible
1. Exposing functions for a Container Component's external API

## Summary

The patterns set forth by React-Composition are very straight-forward:

1. Server-side modules export functions that accept the request and a callback
    * The callback will receive a React component
    * Functions can also be specified to represent the Container Component's external API
1. The React components can load page templates and contribute template sections
    * Template sections are Container Components that are wrapped in a `RenderContainer`
    * The `RenderContainer` receives state and client script to be used for client-side rendering
1. The server simply loads a page and renders its React component
    * The server code does not need to be aware of which page template to render; the page wraps itself in the appropriate template
    * The server code remains independent from any flux/redux implementation in use on the page
1. Client-side entry points load the state and initialize client-side rendering

With this approach, we can easily compose multiple Container Components together into page templates and support universal rendering of any Container Component, regardless of its flux/redux implementation.
