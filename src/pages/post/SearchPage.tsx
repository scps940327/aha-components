import { Box } from "@mui/material";
import Button from "components/Button";
import Input from "components/Input";
import Page from "components/Page";
import SectionTitle from "components/SectionTitle";
import Slider from "components/Slider";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import THEME from "helpers/theme";
import { perPageCountConfigs } from "./constants";
import WrapperWithFollowList from "./WrapperWithFollowList";

const SearchButton = styled(Button.Normal)`
  width: 343px;

  ${THEME.breakpoints.down('sm')} {
    width: 100%;
  }
`;

const DEFAULT_PER_PAGE_COUNT_CONFIG_INDEX = 4;

const SearchPage = () => {
  const [count, setCount] = useState(perPageCountConfigs[DEFAULT_PER_PAGE_COUNT_CONFIG_INDEX].value);
  const [keyword, setKeyword] = useState('');

  return (
    <Page>
      <WrapperWithFollowList>
        <Box borderBottom="1px solid rgba(255, 255, 255, 0.1)" paddingBottom="30px">
          <SectionTitle title="Search" />
          <Input placeholder="Keyword" variant="outlined" fullWidth onChange={(e) => setKeyword(e.target.value)} />
        </Box>
        <Box borderBottom="1px solid rgba(255, 255, 255, 0.1)" paddingBottom="30px">
          <SectionTitle title="# of results per page" />
          <Box display="flex" alignItems="baseline">
            <Box fontSize="48px" fontWeight="700" marginRight="10px">{count}</Box>
            <Box fontSize="16px">results</Box>
          </Box>
          <Slider
            marks={perPageCountConfigs.map(({ label }, index) => ({ label, value: index }))}
            getAriaValueText={(value, index) => perPageCountConfigs[index].label}
            step={null}
            max={perPageCountConfigs.length - 1}
            defaultValue={DEFAULT_PER_PAGE_COUNT_CONFIG_INDEX}
            onChange={(e, value) => setCount(perPageCountConfigs[value as number].value)}
          />
        </Box>
        <Link to={`post/list?keyword=${keyword}&count=${count}`}>
          <SearchButton>SEARCH</SearchButton>
        </Link>
      </WrapperWithFollowList>
    </Page>
  )
};

export default SearchPage;
