import React, { Component } from 'react';
import Default from './Default';
import TopNav from './components/TopNav';
import Page from './components/Page';
import Section from './components/Section';
import Partial from './components/Partial';

class NoFooter extends Component {
    render() {
        const { body: innerBody, ...sections } = Section.rewind();

        return (
            <Page master={Default} {...{sections}}>
                <Section name='body' isStatic={true}>
                    <div id='nofooter'>
                        <Partial id='top-nav'>
                            <TopNav />
                        </Partial>
                        <Partial {...innerBody} />
                    </div>
                </Section>
            </Page>
        );
    }
}

export default (req, callback) => {
    callback(null, <NoFooter />);
};
