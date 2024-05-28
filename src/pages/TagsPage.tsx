import { Box } from "@mui/material";
import Button from "components/Button";
import LoadingPanel from "components/LoadingPanel";
import Page from "components/Page";
import SectionTitle from 'components/SectionTitle';
import THEME from "helpers/theme";
import useIsMobile from "hooks/useIsMobile";
import React, { useEffect, useMemo, useState } from "react";
import { useGetTagListApiQuery } from "services/getTagList";
import styled from "styled-components";

interface TagItem {
  title: string;
  id: string;
  count: number;
}

const ContentWrapper = styled.div`
  padding: 105px 20px;

  ${THEME.breakpoints.down('md')} {
    padding: 20px 20px 86px 20px;
  }
`;

const ListWrapper = styled.div`
  display: grid;
  gap: 36px 24px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;

  ${THEME.breakpoints.down('md')} {
    gap: 24px;
    grid-template-columns: 1fr 1fr;
  }
`;

const TagImg = styled.div<{ tag: string }>`
  padding-bottom: 100%;
  position: relative;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.06);

  &::after {
    position: absolute;
    bottom: 14px;
    left: 10px;
    content: '${({ tag }) => tag}';
    border: 4px solid #FFFFFF;
    border-radius: 8px;
    font-size: 24px;
    font-weight: 700;
    padding: 7px 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: calc(100% - 20px);
    box-sizing: border-box;
  }
`;
const MoreButton = styled(Button.Normal)`
  width: 343px;

  ${THEME.breakpoints.down('md')} {
    width: 100%;
  }
`;

const DEFAULT_PARAMS = {
  page: 1,
  count: 20,
}

const TagsPage = () => {
  const [param, setParam] = useState(DEFAULT_PARAMS);
  const [listData, setListData] = useState<TagItem[]>([]);
  const { data, isLoading, error } = useGetTagListApiQuery(param);
  const { list = [], total = 0, page = 0, count = 0 } = data?.data || {};
  const isMobile = useIsMobile();

  const showMoreButton = useMemo(() =>
    list && !error && (param.page * param.count < total),
    [error, list, param.count, param.page, total],
  );

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
    <Page>
      <ContentWrapper>
        <Box maxWidth="846px" margin="0 auto" display="grid" gap="30px">
          {isMobile && <SectionTitle title="Home Page" backTo="/" />}
          <SectionTitle title="Tags" />
          <ListWrapper>
            {listData.map(({ title, count, id }) => (
              <Box key={id}>
                <TagImg tag={title} />
                <Box fontSize="15px" marginTop="12px">{title}</Box>
                <Box color="#b2b2b2" fontSize="11.17px">{count} results</Box>
              </Box>
            ))}
          </ListWrapper>
          {isLoading && <LoadingPanel />}
          {showMoreButton && (
            <MoreButton
              onClick={() => setParam(prev => ({ ...prev, page: prev.page + 1 }))}
              disabled={isLoading}
            >MORE</MoreButton>
          )}
        </Box>
      </ContentWrapper>
    </Page>
  )
};

export default TagsPage;
