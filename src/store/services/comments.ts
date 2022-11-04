import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQuery } from ".";

export interface CommentType {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}

export const commentsApi = createApi({
    reducerPath: 'commentsApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getComments: builder.query({
            query: (postId) => ({
                url: `comments`,
                method: 'GET',
                params: {...postId}
            })
        }) 
    })
})

export const { useGetCommentsQuery } = commentsApi;