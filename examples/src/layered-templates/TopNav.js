import React from 'react';

export default function loadTopNav(user, callback) {
    setTimeout(() => {
        callback(React.createClass({
            render() {
                return (
                    <div>
                        Top Nav
                        <div>User: { user }</div>
                    </div>
                );
            }
        }), { })
    }, 100);
}
