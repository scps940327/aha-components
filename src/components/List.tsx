import { Box } from "@mui/material";
import THEME from "helpers/theme";
import styled from "styled-components";

interface ListItemProps {
  title: string;
  subTitle: string;
  renderImg: () => JSX.Element;
}

const ListWrapper = styled.div`
  display: grid;
  gap: 31px 34px;
  grid-template-columns: 1fr 1fr 1fr;

  ${THEME.breakpoints.down('md')} {
    gap: 40px;
    grid-template-columns: 1fr;
  }
`;

const ListItem = ({ title, subTitle, renderImg }: ListItemProps) => {
  return (
    <Box>
      {renderImg()}
      <Box fontSize="15px" marginTop="12px">{title}</Box>
      <Box color="#b2b2b2" fontSize="11.17px">{subTitle}</Box>
    </Box>
  );
};

const List = {
  Wrapper: ListWrapper,
  Item: ListItem,
};

export default List;
