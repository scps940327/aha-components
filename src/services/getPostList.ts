// Need to use the React-specific entry point to import createApi
import { createApi } from '@reduxjs/toolkit/query/react';
import googleSheetAPI from 'utils/googleSheetAPI';

export interface PostItem {
  title: string;
  id: string;
  author: string;
  created_at: string;
  imgUrl: string;
}

export interface GetPostListParam {
  page: number;
  count?: number;
  keyword?: string;
}

export interface GetPostListResponse {
  status: string;
  data: {
    page: number;
    count: number;
    list: PostItem[];
    total: number;
  }
}

// Define a service using a base URL and expected endpoints
export const postListApi = createApi({
  reducerPath: 'postList',
  baseQuery: googleSheetAPI.get,
  endpoints: (builder) => ({
    getPostList: builder.query<GetPostListResponse, GetPostListParam>({
      query: (param) => ({
        url: '',
        params: { ...param, category: 'posts' },
      }),
    }),
  }),
})

export const { useGetPostListQuery } = postListApi