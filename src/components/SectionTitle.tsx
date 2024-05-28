import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface IProps {
  title: string;
  backTo?: string;
}

const StyledBackToLink = styled(Link)`
  color: #ffffff;
  margin-right: 12px;
`;

const SectionTitle = ({ title, backTo }: IProps) => {
  return (
    <Box display="flex" alignItems="flex-end" marginBottom="20px">
      {backTo && (
        <StyledBackToLink to={backTo}>
          <ArrowBackIosIcon />
        </StyledBackToLink>
      )}
      <Box fontSize="24px">{title}</Box>
    </Box>
  )
}

export default SectionTitle;
