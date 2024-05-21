import { PropsWithChildren } from "react";
import styled from "styled-components";
import PageHeader from "./PageHeader";
import THEME from "../helpers/theme";
import { Box } from "@mui/material";

type Props = PropsWithChildren<{
}>

const PageContainer = styled.div`
  background-color: ${THEME.colors.backgroundPage};
  min-height: 100vh;
  color: #ffffff;
  display: flex;
  align-items: stretch;
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
