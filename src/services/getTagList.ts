import { createApi } from '@reduxjs/toolkit/query/react';
import googleSheetAPI from 'utils/googleSheetAPI';

interface Tag {
  title: string;
  id: string;
  count: number;
}

export type GetTagListParam = {
  page: number;
  count?: number;
};

export interface GetTagListResponse {
  status: string;
  data: {
    page: number;
    count: number;
    list: Tag[];
    total: number;
  }
}

// Define a service using a base URL and expected endpoints
export const tagListApi = createApi({
  reducerPath: 'tagList',
  baseQuery: googleSheetAPI.get,
  endpoints: (builder) => ({
    getTagListApi: builder.query<GetTagListResponse, GetTagListParam>({
      query: (param) => ({
        url: '',
        params: { ...param, category: 'tags' },
      }),
    }),
  }),
})

export const { useGetTagListApiQuery } = tagListApi