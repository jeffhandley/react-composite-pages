import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import loadCounter from '../../components/Counter/server';
import loadMaster from '../../masters/FullPage';
import Title from '../../components/Title';
import url from 'url';

export default (req, callback) => {
    const { count = 4 } = url.parse(req.url, true).query;

    loadCounter(count, (Counter, counterActions) => {
        counterActions.increment();

        loadMaster(req, (Master, masterActions) => {
            const Page = React.createClass({
                render() {
                    return (
                        <Master
                            body={
                                <div>
                                    <Title title='Counter Page' />
                                    Displaying the Counter...
                                    <Counter id='app-counter' clientSrc='/client/pages/counter.js' />
                                </div>
                            }
                        />
                    );
                }
            });

            callback(
                Page,
                {
                    ...masterActions,
                    ...counterActions
                }
            );
        });
    });
};
