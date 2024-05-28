import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { followerListApi } from 'services/getFollowers';
import { postListApi } from 'services/getPostList';
import { tagListApi } from 'services/getTagList';

const store = configureStore({
  reducer: {
    [postListApi.reducerPath]: postListApi.reducer,
    [followerListApi.reducerPath]: followerListApi.reducer,
    [tagListApi.reducerPath]: tagListApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(
        postListApi.middleware,
        followerListApi.middleware,
        tagListApi.middleware,
      ),
})

setupListeners(store.dispatch)

export default store;