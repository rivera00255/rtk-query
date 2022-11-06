import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import { TodoType, useGetTodosQuery } from 'src/store/services/todos';
import Switch from '@mui/material/Switch';

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

const Todo = () => {

    const { data: todoData } = useGetTodosQuery({});

    const todos = useMemo(() => todoData, [todoData]);

    return (
        <Container>
            <CardWrapper>
                {
                    todos?.map((item: TodoType) => (
                        <Card key={item.id}>{item.title}<Switch defaultChecked={item.completed ? true : false} /></Card>
                    ))
                }
            </CardWrapper>
        </Container>
    );
}

export default Todo;