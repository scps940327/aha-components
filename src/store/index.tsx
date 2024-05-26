import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { followerListApi } from 'services/getFollowers';
import { postListApi } from 'services/getPostList';

const store = configureStore({
  reducer: {
    [postListApi.reducerPath]: postListApi.reducer,
    [followerListApi.reducerPath]: followerListApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(postListApi.middleware)
      .concat(followerListApi.middleware),
})

setupListeners(store.dispatch)

export default store;