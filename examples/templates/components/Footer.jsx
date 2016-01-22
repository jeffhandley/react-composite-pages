import React from 'react';

export default React.createClass({
    render() {
        return (
            <div>
                Querystring options for all pages:
                <ul>
                    <li>
                        <b>template</b>:
                        <div><a href="?template=basic"><i>basic</i></a> (default) does not include a page header</div>
                        <div><a href="?template=header"><i>header</i></a> inherits from the <i>basic</i> template and adds an interactive header component</div>
                    </li>
                    <li>
                        <b>username</b>: User name to show when the header template is used
                    </li>
                </ul>
                Querystring options for the example pages:
                <ul>
                    <li>
                        <b>to</b>:
                        <div>Whom to say hello to on the <a href="/hello?to=you">hello</a> page</div>
                        <div>
                            The number to initially count to on the&nbsp;
                            <a href="/counter-redux?to=10">counter-redux</a> and&nbsp;
                            <a href="/counter-fluxible?to=10">counter-fluxible</a> pages
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
});