## rtk-query

#### 1. API Slice 생성

```
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
    })
  })
})

export const { useGetPostsQuery } = postsApi
```

#### 2. store에 서비스 추가

```
export const store = configureStore({
    reducer: {
        [postsApi.reducerPath]: postsApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(postsApi.middleware)
})
```

#### 3. Provider로 감싸기

```
import { Provider } from 'react-redux';
import { store } from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

#### 4. 컴포넌트에서 쿼리 사용하기

#### - Queries

주로 GET 요청에 사용

#### - Mutations

데이터 업데이트를 전달 (POST, PUT, DELETE, \*GET 요청도 가능)

##### → 참고

[https://redux-toolkit.js.org/rtk-query/overview](https://redux-toolkit.js.org/rtk-query/overview)  
[https://velog.io/@regis100/RTK-Query](https://velog.io/@regis100/RTK-Query)  
[https://junsangyu.gitbook.io/rtk-query](https://junsangyu.gitbook.io/rtk-query)
