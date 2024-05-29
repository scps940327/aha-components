import { Box } from "@mui/material";
import THEME from 'helpers/theme';
import { PropsWithChildren } from "react";
import styled from "styled-components";
import PageHeader from "./PageHeader";

type Props = PropsWithChildren<{
  isMobileSubPage?: boolean;
}>

const PageContainer = styled.div`
  background-color: ${THEME.colors.BG_DARK};
  min-height: 100vh;
  color: #ffffff;
  display: flex;
  align-items: stretch;
  position: relative;

  ${THEME.breakpoints.down('md')} {
    flex-direction: column;
  }
`;

const Page = ({ children, isMobileSubPage }: Props) => {
  return (
    <PageContainer>
      <PageHeader isMobileSubPage={isMobileSubPage} />
      <Box flex="1">
        {children}
      </Box>
    </PageContainer>
  )
};

export default Page;
