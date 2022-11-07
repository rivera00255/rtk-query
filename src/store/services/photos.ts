import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQuery } from ".";

export interface PhotoType {
    albumId: number;
    id: number;
    thumbnailUrl: string;
    title: string;
    url: string;
}

export const photosApi = createApi({
    reducerPath: 'photosApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getPhotos: builder.query({
            query: () => ({
                url: 'photos',
                method: 'GET'
            })
        })
    })
})

export const { useGetPhotosQuery } = photosApi