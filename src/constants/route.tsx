import { NonIndexRouteObject } from 'react-router-dom';
import { SearchPage, TagsPage, ListPage } from '../pages';

interface RouteConfig extends NonIndexRouteObject {
  title?: string;
  isMenu?: boolean;
}

export const routes: RouteConfig[] = [
  {
    path: "/",
    id: 'post-search',
    title: 'Home',
    element: <SearchPage />,
    isMenu: true,
  },
  {
    path: "post/list",
    id: 'post-list',
    element: <ListPage />,
  },
  {
    path: "tag/list",
    id: 'tag-list',
    title: 'Tags',
    element: <TagsPage />,
    isMenu: true,
  },
];