import React, { useMemo, useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { PostType, useGetPostsQuery } from 'src/store/services/posts';
import { useGetUsersQuery, UserType } from 'src/store/services/users';
import PostModal from 'src/components/PostModal';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import PostFormModal from 'src/components/PostFormModal';

export interface PostContentType {
    postId: number;
    username: string;
    title: string;
    body: string;
}

const Container = styled.section`
    width: 100%;
    max-width: 960px;
    margin: 0 auto;
    padding: 40px 0;
`;

const CardWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    position: relative;
`;

const AddPostButtonWrapper = styled.div`
    position: fixed;
    right: 50px;
    bottom: 30px;
`;

const Main = () => {

    const [popup, setPopup] = useState(false);
    const [selected, setSelected] = useState<PostContentType | null>(null);
    const [formPopup, setFormPopup] = useState(false);

    const { data: postData, refetch: postRefetch, isLoading } = useGetPostsQuery({});
    const { data: userData, refetch: userRefetch } = useGetUsersQuery({});

    const posts = useMemo(() => postData, [postData]);
    const users = useMemo(() => userData, [userData]);
    // console.log(posts);
    // console.log(users);

    useEffect(() => {
        postRefetch();
        userRefetch();
    }, []);

    if (isLoading) { return ( <Container>Loading...</Container> ) } else {
    return (
        <Container>
            { (popup === true && selected !== null) && <PostModal popup={popup} setPopup={setPopup} selected={selected} /> }
            { (formPopup === true && <PostFormModal formPopup={formPopup} setFormPopup={setFormPopup} />) }
            <CardWrapper>
                {
                    posts?.map((item: PostType, i: number) => (
                        <Card sx={{ width: 520, margin: 3 }} key={item.id} style={{ cursor: 'pointer' }} onClick={() => {
                            setSelected((prev) => ({...prev, postId: item.id, title: item.title, body: item.body, username: users[Number(item.userId) - 1]?.username }));
                            setPopup(true);
                        }}>
                            <CardContent>
                                { users?.map((user: UserType) => (<p key={user.id} style={{ color: '#1565c0' }}>{item.userId === user.id ? user.username : ''}</p>)) }
                                <p><strong style={{ fontSize: '1.1rem'}}>{item.title}</strong></p>
                            </CardContent>
                        </Card>
                    ))
                }
                <AddPostButtonWrapper>
                    <Fab color="primary" aria-label="add" onClick={() => setFormPopup(true)}>
                        <AddIcon />
                    </Fab>
                </AddPostButtonWrapper>
            </CardWrapper>
        </Container>
    )}
}

export default Main;
