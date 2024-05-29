import { Box } from "@mui/material";
import Button from "components/Button";
import LoadingPanel from "components/LoadingPanel";
import Page from "components/Page";
import SectionTitle from "components/SectionTitle";
import THEME from "helpers/theme";
import useIsMobile from "hooks/useIsMobile";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { PostItem, useGetPostListQuery } from "services/getPostList";
import styled from "styled-components";
import WrapperWithFollowList from "./WrapperWithFollowList";

interface SearchParam {
  page: number;
  count: number;
  keyword: string;
}

const SectionTitleWrapper = styled.div`
  margin-top: 40px;

  ${THEME.breakpoints.up('md')} {
    margin-left: -34px;
    margin-bottom:4px;
  }
`;

const ListWrapper = styled.div`
  display: grid;
  gap: 31px 34px;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr);

  ${THEME.breakpoints.down('md')} {
    gap: 40px 0;
    grid-template-columns: minmax(0, 1fr);
  }
`;

const PostImage = styled.div<{ imgurl: string }>`
  background-image: url('${({ imgurl }) => imgurl}');
  background-size: cover;
  background-position: center;
  padding-bottom: 66.667%;
`;

const MoreButton = styled(Button.Normal)`
  &.MuiButtonBase-root {
    ${THEME.breakpoints.up('md')} {
      margin-top: 39px;
      width: 343px;
    }

    ${THEME.breakpoints.down('md')} {
      width: 100%;
    }
  }
`;

const ListPage = () => {
  const { search } = useLocation();
  const [isInit, setIsInit] = useState(false);
  const [param, setParam] = useState<SearchParam>({
    page: 1,
    keyword: '',
    count: 20,
  });
  const [listData, setListData] = useState<PostItem[]>([]);
  const { data, error, isLoading } = useGetPostListQuery(param, { skip: !isInit });
  const { list = [], total = 0, page = 0, count = 0 } = data?.data || {};
  const isMobile = useIsMobile();
  
  const showMoreButton = useMemo(() =>
    list && !error && (param.page * param.count < total),
    [error, list, param.count, param.page, total],
  );

  useEffect(() => {
    if (!isInit) {
      const searchParams = new URLSearchParams(search);
      setParam({
        page: 1,
        keyword: searchParams.get('keyword') ?? '',
        count: searchParams.get('count') ? Number(searchParams.get('count')) : 20,
      });
      setIsInit(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    if (list?.length) {
      setListData(prev => [
        ...prev.slice(0, page * count),
        ...list,
      ]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list]);

  return (
    <Page isMobileSubPage>
      <WrapperWithFollowList>
        <SectionTitleWrapper>
          <SectionTitle backTo={isMobile ? undefined : "/"} title="Results" />
        </SectionTitleWrapper>
        <ListWrapper>
          {listData.map(({ title, author, id, imgUrl }) => (
            <Box key={id}>
              <PostImage imgurl={imgUrl} />
              <Box
                fontSize="15px"
                marginTop="12px"
                overflow="hidden"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
              >
                {title}
              </Box>
              <Box color="#b2b2b2" fontSize="11.17px">{author}</Box>
            </Box>
          ))}
        </ListWrapper>
        {isLoading && (
          <LoadingPanel />
        )}
        {showMoreButton && (
          <MoreButton
            onClick={() => setParam(prev => ({ ...prev, page: prev.page + 1 }))}
            disabled={isLoading}
          >
            MORE
          </MoreButton>
        )}
      </WrapperWithFollowList>
    </Page>
  )
};

export default ListPage;
