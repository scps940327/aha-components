import { Box } from "@mui/material";
import Button from "components/Button";
import LoadingPanel from "components/LoadingPanel";
import Page from "components/Page";
import SectionTitle from 'components/SectionTitle';
import THEME from "helpers/theme";
import React, { useEffect, useMemo, useState } from "react";
import { useGetTagListApiQuery } from "services/getTagList";
import styled from "styled-components";

interface TagItem {
  title: string;
  id: string;
  count: number;
}

const ContentWrapper = styled.div`
  padding: 60px 20px 20px 20px;

  ${THEME.breakpoints.down('md')} {
    padding: 0 20px 86px 20px;
  }
`;

const ContentMaxWidthWrapper = styled.div`
  max-width: 846px;
  margin: 0 auto;
  display: grid;
  gap: 24px;
`;

const ListWrapper = styled.div`
  display: grid;
  gap: 36px 24px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;

  ${THEME.breakpoints.down('md')} {
    gap: 24px;
    grid-template-columns: 1fr 1fr;
    padding: 0 5px;
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
    padding: 3px 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: calc(100% - 20px);
    box-sizing: border-box;
  }
`;

const MoreButton = styled(Button.Normal)`
  &.MuiButtonBase-root {
    width: 343px;
    margin-top: 15px;

    ${THEME.breakpoints.down('md')} {
      width: 100%;
    }
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
    <Page isMobileSubPage>
      <ContentWrapper>
        <ContentMaxWidthWrapper>
          <SectionTitle title="Tags" margin="20px 0 0 0" />
          <ListWrapper>
            {listData.map(({ title, count, id }) => (
              <Box key={id}>
                <TagImg tag={title} />
                {/* <TagItemTitle>{title}</TagItemTitle> */}
                <Box
                  color="#ffffff"
                  fontSize="14.9px"
                  lineHeight="22.35px"
                  letterSpacing="0.14px"
                  marginTop="10px"
                >
                  {title}
                </Box>
                <Box
                  color="#b2b2b2"
                  fontSize="11.17px"
                  lineHeight="16.76px"
                  letterSpacing="0.37px"
                >
                  {count} results
                </Box>
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
        </ContentMaxWidthWrapper>
      </ContentWrapper>
    </Page>
  )
};

export default TagsPage;
