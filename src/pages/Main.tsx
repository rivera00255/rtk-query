import React, { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import { PostType, useGetPostsQuery } from 'src/store/services/posts';
import { useGetUsersQuery, UserType } from 'src/store/services/users';
import PostModal from 'src/components/PostModal';

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
`;

const Main = () => {

    const [expanded, setExpanded] = useState<number[]>([]);
    const [popup, setPopup] = useState(false);
    const [selected, setSelected] = useState<PostContentType | null>(null);
    // console.log(expanded);

    const { data: postData, isLoading } = useGetPostsQuery({});
    const { data: userData } = useGetUsersQuery({});

    const posts = useMemo(() => postData, [postData]);
    const users = useMemo(() => userData, [userData]);
    // console.log(post);
    // console.log(users);

    if (isLoading) { return ( <Container>Loading...</Container> ) } else {
    return (
        <Container>
            { (popup === true && selected !== null) && <PostModal popup={popup} setPopup={setPopup} selected={selected} /> }
            <CardWrapper>
                {
                    posts?.map((item: PostType, i: number) => (
                        <Card sx={{ width: 520, margin: 3 }} key={item.id} style={{ cursor: 'pointer' }} onClick={() => {
                            setSelected((prev) => ({...prev, postId: item.id, title: item.title, body: item.body, username: users[item.userId]?.username }));
                            setPopup(true);
                        }}>
                            <CardContent>
                                { users?.map((user: UserType) => (<p key={user.id} style={{ color: '#1565c0' }}>{item.userId === user.id ? user.username : ''}</p>)) }
                                <p><strong style={{ fontSize: '1.1rem'}}>{item.title}</strong></p>
                            </CardContent>
                            {/* <CardActions style={{ display: 'flex', justifyContent: 'right' }}>
                                <IconButton aria-label="show more" style={{ transform: !expanded.includes(item.id) ? 'rotate(0deg)' : 'rotate(180deg)', transition: '0.5s' }} onClick={() => {
                                    // setExpanded(!expanded);
                                    if(!expanded.includes(item.id)) {
                                        setExpanded([...expanded, item.id])
                                    } else {
                                        setExpanded(expanded.filter(el => el !== item.id))
                                    }
                                }}><ExpandMoreIcon /></IconButton>
                            </CardActions>
                            <Collapse in={expanded.includes(item.id) ? true : false} timeout="auto" unmountOnExit>
                                <CardContent>{item.body}</CardContent>
                            </Collapse> */}
                        </Card>
                    ))
                }
            </CardWrapper>
        </Container>
    )}
}

export default Main;
