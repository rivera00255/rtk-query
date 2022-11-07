import React, { useEffect, useMemo } from 'react';
import styled from '@emotion/styled';
import { TodoType, useEditTodoCompletedMutation, useGetTodosQuery } from 'src/store/services/todos';
import Switch from '@mui/material/Switch';
import { useGetUsersQuery, UserType } from 'src/store/services/users';

const Container = styled.section`
    width: 100%;
    max-width: 960px;
    margin: 0 auto;
    padding: 40px 0;
`;

const CardWrapper = styled.div`
    width: 80%;
    margin: 0 auto
`;

const Card = styled.div`
    width: 100%;
    border-left: 4px solid #ddd;
    color: #444;
    margin: 16px 0;
    padding: 5px 0 5px 10px;
`;

const Text = styled.div`
    color: #888;
    font-size: 13px;
`;

const Todo = () => {

    const { data: todoData, refetch } = useGetTodosQuery({});
    const { data: userData } = useGetUsersQuery({});

    const [update] = useEditTodoCompletedMutation();

    const todos = useMemo(() => todoData, [todoData]);
    const users = useMemo(() => userData, [userData]);

    useEffect(() => {
        refetch();
    }, []);

    return (
        <Container>
            <CardWrapper>
                {
                    todos?.map((item: TodoType) => (
                        <Card key={item.id}>
                            {item.title}<Switch defaultChecked={item.completed ? true : false} onClick={async() => {
                                try {
                                    const response: any = await update(item.id);
                                    response?.data.id !== 0 && alert('Update!');
                                } catch(e) {
                                    console.log(e);
                                }
                            }} />
                            { users?.map((user: UserType) => (item.userId === user.id && <Text key={user.id}>{user.username} ({user.email})</Text>)) }
                        </Card>
                    ))
                }
            </CardWrapper>
        </Container>
    );
}

export default Todo;