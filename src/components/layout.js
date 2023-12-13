import React from 'react'
import styled from 'styled-components';
import HeroSection from './heroSection'
import Header from './header';
import JobCard from './jobCard';

function Layout() {
    return (
        <Container>
            <Header/>
            <JobCard/>
        </Container>

    )
}

export default Layout;
export const Container = styled.div`
    max-width: 1600px;
    margin: auto;
    padding: 40px 30px;
`