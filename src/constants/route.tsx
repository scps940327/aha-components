import { SearchPage, TagsPage, ListPage } from '../pages';

interface RouteConfig {
  key: string;
  path: string;
  element: JSX.Element;
  title?: string;
  isMenu?: boolean;
}

export const routes: RouteConfig[] = [
  {
    path: "/",
    key: 'post',
    title: 'Home',
    element: <SearchPage />,
    isMenu: true,
  },
  {
    path: "post/list",
    key: 'post-list',
    element: <ListPage />,
  },
  {
    path: "tags/list",
    key: 'tags-list',
    title: 'Tags',
    element: <TagsPage />,
    isMenu: true,
  },
];