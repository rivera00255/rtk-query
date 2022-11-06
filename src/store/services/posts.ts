import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '.';

export interface PostType {
  id: number;
  userId: number;
  title: string;
  body: string;
  selected?: boolean;
}

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => ({
        url: 'posts',
        method: 'GET'
      })
    }),
    addPost: builder.mutation({
      query: (data: { body: string; }) => ({
        url: 'posts',
        method: 'POST',
        body: data
      })
    })
  })
})

export const { useGetPostsQuery, useAddPostMutation } = postsApi