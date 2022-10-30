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
import { useGetCommentsQuery } from 'src/store/services/comments';

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

    const [skip, setSkip] = useState(true);

    const { data: postData } = useGetPostsQuery({});
    const { data: userData } = useGetUsersQuery({});
    const { data: commentData } = useGetCommentsQuery({ param: '' }, { skip });

    const posts = useMemo(() => postData, [postData]);
    const users = useMemo(() => userData, [userData]);
    // console.log(post);
    // console.log(users);

    const [expanded, setExpanded] = useState<number[]>([]);
    // console.log(expanded);


    return (
        <Container>
            <CardWrapper>
                {
                    posts?.map((item: PostType, i: number) => (
                        <Card sx={{ width: 520, margin: 3 }} key={item.id} style={{ cursor: 'pointer' }}>
                            <CardContent style={{ position: 'relative' }}>
                                { users?.map((user: UserType) => (<p key={user.id} style={{ color: '#1565c0', textAlign: 'right' }}>{item.userId === user.id && user.username}</p>)) }
                                <p><strong style={{ fontSize: '1.1rem'}}>{item.title}</strong></p>
                                <p>{item.body}</p>
                            </CardContent>
                            <CardActions>
                                <IconButton aria-label="show more" onClick={() => {
                                    // setExpanded(!expanded);
                                    if(!expanded.includes(item.id)) {
                                        setExpanded([...expanded, item.id])
                                    } else {
                                        setExpanded(expanded.filter(el => el !== item.id))
                                    }
                                }}><ExpandMoreIcon /></IconButton>
                            </CardActions>
                            <Collapse in={expanded.includes(item.id) ? true : false} timeout="auto" unmountOnExit>
                                <CardContent>open</CardContent>
                            </Collapse>
                        </Card>
                    ))
                }
            </CardWrapper>
        </Container>
    );
}

export default Main;
