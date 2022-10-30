import React, { Fragment, useMemo } from 'react';
import styled from '@emotion/styled';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { AlbumType, useGetAlbumsQuery } from 'src/store/services/albums';
import { useGetUsersQuery, UserType } from 'src/store/services/users';

const Container = styled.section`
    width: 100%;
    max-width: 960px;
    margin: 0 auto;
    padding: 40px 0;
`;

const CardWrapper = styled.div`
    width: 90%;
    margin: 0 auto;
`;

const Album = () => {

    const { data: albumData } = useGetAlbumsQuery({});
    const { data: userData } = useGetUsersQuery({});

    const album = useMemo(() => albumData, [albumData]);
    const user = useMemo(() => userData, [userData]);
    // console.log(album);

    return (
        <Container>
            <CardWrapper>
                    {
                        album?.map((item: AlbumType) => (
                            <Card key={item.id} style={{ margin: '16px 0' }}>
                                <CardContent>
                                    <p>
                                        <strong>{item.title}</strong>&nbsp;&nbsp;-&nbsp;
                                        { user?.map((user: UserType) => (<Fragment key={user.id}>{item.userId === user.id && user.username}</Fragment>)) }
                                    </p>
                                </CardContent>
                            </Card>
                        ))
                    }
            </CardWrapper>
        </Container>
    )
}

export default Album;