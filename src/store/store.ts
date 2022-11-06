import { configureStore } from "@reduxjs/toolkit";
import { postsApi } from "./services/posts";
import { setupListeners } from '@reduxjs/toolkit/query'
import { usersApi } from "./services/users";
import { commentsApi } from "./services/comments";
import { photosApi } from "./services/photos";
import { todosApi } from "./services/todos";

export const store = configureStore({
    reducer: {
        [postsApi.reducerPath]: postsApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
        [commentsApi.reducerPath]: commentsApi.reducer,
        [photosApi.reducerPath]: photosApi.reducer,
        [todosApi.reducerPath]: todosApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(postsApi.middleware).concat(usersApi.middleware)
    .concat(commentsApi.middleware).concat(photosApi.middleware)
    .concat(todosApi.middleware)
})

setupListeners(store.dispatch)