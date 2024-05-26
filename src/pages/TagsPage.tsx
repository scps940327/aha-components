import { Box } from "@mui/material";
import Page from "components/Page";
import SectionTitle from 'components/SectionTitle';
import THEME from "helpers/theme";
import React from "react";
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

const TagsPage = () => {

  const lists: TagItem[] = [
    {
      title: 'happiness',
      id: 'id_1',
      count: 255,
    },
    {
      title: 'good',
      id: 'id_2',
      count: 30,
    },
    {
      title: 'funny',
      id: 'id_3',
      count: 937
    }
  ]

  return (
    <Page>
      <ContentWrapper>
        <Box maxWidth="846px" margin="0 auto" display="grid" gap="30px">
          <SectionTitle title="Tags" />
          <ListWrapper>
            {lists.map(({ title, count, id }) => (
              <Box key={id}>
                <TagImg tag={title} />
                <Box fontSize="15px" marginTop="12px">{title}</Box>
                <Box color="#b2b2b2" fontSize="11.17px">{count} results</Box>
              </Box>
            ))}
          </ListWrapper>
        </Box>
      </ContentWrapper>
    </Page>
  )
};

export default TagsPage;
