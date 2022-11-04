import { configureStore } from "@reduxjs/toolkit";
import { postsApi } from "./services/posts";
import { setupListeners } from '@reduxjs/toolkit/query'
import { usersApi } from "./services/users";
import { albumsApi } from "./services/albums";
import { commentsApi } from "./services/comments";

export const store = configureStore({
    reducer: {
        [postsApi.reducerPath]: postsApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
        [albumsApi.reducerPath]: albumsApi.reducer,
        [commentsApi.reducerPath]: commentsApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(postsApi.middleware).concat(usersApi.middleware).concat(albumsApi.middleware).concat(commentsApi.middleware)
    
})

setupListeners(store.dispatch)