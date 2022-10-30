import React, { useState } from 'react';
import styled from '@emotion/styled';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Link, useNavigate } from 'react-router-dom';

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

    const [tabIndex, setTabIndex] = useState(0);

    const handleTab = (e: React.SyntheticEvent, index: number) => {
        setTabIndex(index);
    };

    return (
        <Container>
            <Nav>
                <Tabs value={tabIndex} onChange={handleTab}>
                    <Tab label="Post" onClick={() => navigate('/')} />
                    <Tab label="Album" onClick={() =>  navigate('/album')} />
                    <Tab label="Photo" />
                    <Tab label="MyPage" />
                </Tabs>
            </Nav>
        </Container>
    );
}

export default Header;
