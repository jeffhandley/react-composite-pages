import React from 'react';
import { Router, Route } from 'react-router';
import hello from './pages/hello';
import counterRedux from './pages/counter-redux';
import counterFluxible from './pages/counter-fluxible';

export default (
    <Router>
        <Route path="/hello" component={ hello } />
        <Route path="/counter-redux" component={ counterRedux } />
        <Route path="/counter-fluxible" component={ counterFluxible } />
    </Router>
);
