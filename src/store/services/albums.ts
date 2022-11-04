import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQuery } from ".";

export interface AlbumType {
    id: number;
    title: string;
    userId: number;
}

export const albumsApi = createApi({
    reducerPath: 'albumsApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getAlbums: builder.query({
            query: () => ({
                url: 'albums',
                method: 'GET'
            })
        })
    })
})

export const { useGetAlbumsQuery } = albumsApi;