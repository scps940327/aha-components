import { Box } from "@mui/material";
import THEME from 'helpers/theme';
import { PropsWithChildren } from "react";
import styled from "styled-components";
import PageHeader from "./PageHeader";

type Props = PropsWithChildren<{
}>

const PageContainer = styled.div`
  background-color: ${THEME.colors.BG_DARK};
  min-height: 100vh;
  color: #ffffff;
  display: flex;
  align-items: stretch;

  ${THEME.breakpoints.down('md')} {
    flex-direction: column;
  }
`;

const Page = ({ children }: Props) => {
  return (
    <PageContainer>
      <PageHeader />
      <Box flex="1">
        {children}
      </Box>
    </PageContainer>
  )
};

export default Page;
