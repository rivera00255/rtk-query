import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const postsApi = createApi({
    reducerPath: 'postsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: () => ({
                url: 'posts',
                method: 'GET'
            })
        }),
        getComments: builder.query({
            query: (postId) => ({
                url: 'comments',
                method: 'GET',
                params: postId
            })
        })
    })
})

export const { useGetPostsQuery, useGetCommentsQuery } = postsApi