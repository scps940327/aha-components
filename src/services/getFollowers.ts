import { createApi } from '@reduxjs/toolkit/query/react';
import googleSheetAPI from 'utils/googleSheetAPI';

interface User {
  fullName: string;
  userName: string;
  id: string;
  isFollowing: boolean;
  imgUrl: string;
}

export type GetFollowerListParam = {
  isFollowing?: boolean;
} | void;

export interface GetFollowerListResponse {
  status: string;
  data: {
    page: number;
    count: number;
    list: User[];
    total: number;
  }
}

// Define a service using a base URL and expected endpoints
export const followerListApi = createApi({
  reducerPath: 'followerList',
  baseQuery: googleSheetAPI.get,
  endpoints: (builder) => ({
    getFollowerListApi: builder.query<GetFollowerListResponse, GetFollowerListParam>({
      query: (param = {}) => ({
        url: '',
        params: { ...param, category: 'follower', count: 999 },
      }),
    }),
  }),
})

export const { useGetFollowerListApiQuery } = followerListApi