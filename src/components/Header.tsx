import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useLocation, useNavigate } from 'react-router-dom';

const Container = styled.header`
    width: 100%;
    max-width: 960px;
    margin: 0 auto;
`;

const Nav = styled.nav`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const Header = () => {

    const navigate = useNavigate();
    const location = useLocation();
    // console.log(location.pathname);

    const [tabIndex, setTabIndex] = useState(0);

    const handleTab = (e: React.SyntheticEvent, index: number) => {
        setTabIndex(index);
    };

    const handleTabIndex = () => {
        location.pathname === '/' && setTabIndex(0);
        location.pathname === '/photo' && setTabIndex(1);
        location.pathname === '/todo' && setTabIndex(2);
    }

    useEffect(() => {
        handleTabIndex();
    }, [])

    return (
        <Container>
            <Nav>
                <Tabs value={tabIndex} onChange={handleTab}>
                    <Tab label="Post" onClick={() => navigate('/')} />
                    <Tab label="Photo" onClick={() =>  navigate('/photo')} />
                    <Tab label="todo" onClick={() => navigate('/todo')} />
                </Tabs>
            </Nav>
        </Container>
    );
}

export default Header;
