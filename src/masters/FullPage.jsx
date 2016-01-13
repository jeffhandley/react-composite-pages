import React, { Component } from 'react';
import Default from './Default';
import Page from './components/Page';
import Section from './components/Section';
import TopNav from './components/TopNav';
import Footer from './components/Footer';
import Partial from './components/Partial';

class FullPage extends Component {
    render() {
        const { body: innerBody, ...sections } = Section.rewind();

        return (
            <Page master={Default} {...{sections}}>
                <Section name='body' isStatic={true}>
                    <div id='fullpage'>
                        <Partial id='top-nav'>
                            <TopNav />
                        </Partial>
                        <Partial {...innerBody} />
                        <Partial id='footer'>
                            <Footer />
                        </Partial>
                    </div>
                </Section>
            </Page>
        );
    }
}

export default FullPage;
