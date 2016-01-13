import React from 'react';
import Master from './Master';
import Section from './Section';

export default ({ master, sections, children }) => (
    <div className='page-container'>
        <Master type={master} />
        { sections && sections.length && sections.map((section) => (
            <Section key={section.name} {...section} />
        ))}
        { children }
    </div>
);
