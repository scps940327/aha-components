import { Box } from "@mui/material";
import Button from "components/Button";
import Input from "components/Input";
import Page from "components/Page";
import Slider from "components/Slider";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import THEME from "helpers/theme";
import { perPageCountConfigs, searchFormKey } from "./constants";
import WrapperWithFollowList from "./WrapperWithFollowList";
import { useForm } from "react-hook-form";

const SearchButton = styled(Button.Normal)`
  &.MuiButtonBase-root {
    position: absolute;

    ${THEME.breakpoints.up('md')} {
      width: 343px;
      bottom: 87px;
    }

    ${THEME.breakpoints.down('md')} {
      &.MuiButtonBase-root {
        left: 20px;
        bottom: 90px;
        width: calc(100% - 40px);
      }
    }
  }
`;

const FormFieldWrapper = styled.div`
  ${THEME.breakpoints.up('md')} {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding-bottom: 30px;
    margin-bottom: 30px;
  }
`;

const FormFieldLabel = styled.div`
  font-size: 24px;
  font-weight: normal;
  line-height: 36px;
  margin-bottom: 20px;
`;

const DEFAULT_PER_PAGE_COUNT_CONFIG_INDEX = 4;

const SearchPage = () => {
  const { register, setValue, watch } = useForm({
    defaultValues: {
      [searchFormKey.COUNT]: perPageCountConfigs[DEFAULT_PER_PAGE_COUNT_CONFIG_INDEX].value,
      [searchFormKey.KEYWORD]: '',
    }
  });
  const [countValue, keywordValue] = watch([searchFormKey.COUNT, searchFormKey.KEYWORD]);

  useEffect(() => {
    register(searchFormKey.COUNT);
  }, [register]);

  return (
    <Page>
      <WrapperWithFollowList>
        <FormFieldWrapper>
          <FormFieldLabel>Search</FormFieldLabel>
          <Input
            {...register(searchFormKey.KEYWORD)}
            placeholder="Keyword"
            variant="outlined"
            fullWidth
          />
        </FormFieldWrapper>
        <FormFieldWrapper>
          <FormFieldLabel># of results per page</FormFieldLabel>
          <Box display="flex" alignItems="baseline">
            <Box fontSize="48px" fontWeight="700" marginRight="10px">{countValue}</Box>
            <Box fontSize="16px">results</Box>
          </Box>
          <Slider
            marks={perPageCountConfigs.map(({ label }, index) => ({ label, value: index }))}
            getAriaValueText={(value, index) => perPageCountConfigs[index].label}
            step={null}
            defaultValue={DEFAULT_PER_PAGE_COUNT_CONFIG_INDEX}
            min={undefined}
            max={perPageCountConfigs.length - 1}
            onChange={(e, value) => setValue(
              searchFormKey.COUNT,
              perPageCountConfigs[value as number].value
            )}
          />
        </FormFieldWrapper>
        <Link to={`post/list?keyword=${keywordValue}&count=${countValue}`}>
          <SearchButton>SEARCH</SearchButton>
        </Link>
      </WrapperWithFollowList>
    </Page>
  )
};

export default SearchPage;
