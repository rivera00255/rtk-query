import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQuery } from ".";

export interface TodoType {
    id: number;
    userId: number;
    title: string;
    completed: boolean;
}

export const todosApi = createApi({
    reducerPath: 'todosApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: () => ({
                url: '/todos',
                method: 'GET'
            })
        })
    })
})

export const { useGetTodosQuery } = todosApi;