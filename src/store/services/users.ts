import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { baseQuery } from ".";

export interface UserType {
    id: number;
    name: string;
    phone: string;
    username: string;
    website: string;
    email: string;
    address: {
        city: string;
        geo: { lat: number, lng: number }
        street: string;
        suite: string;
        zipcode: string;
    }
    comapny: {
        bs: string;
        catchPhrase: string;
        name: string;
    }
}

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
      getUsers: builder.query({
        query: (id) => ({
            url: 'users',
            method: 'GET',
            params: {...id}
        })
      }),
    }),
  })

export const { useGetUsersQuery } = usersApi