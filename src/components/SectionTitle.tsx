import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Box, BoxProps } from "@mui/material";
import THEME from 'helpers/theme';
import { Link } from "react-router-dom";
import styled from "styled-components";

interface IProps extends BoxProps {
  title: string;
  backTo?: string;
}

const Container = styled(Box)`
  display: flex;
  align-items: flex-end;
  margin-bottom: 20px;

  ${THEME.breakpoints.down('md')} {
    margin-bottom: 16px;
  }
`;

const StyledBackToLink = styled(Link)`
  color: #ffffff;
  margin-right: 12px;
`;

const TitleText = styled.div`
  font-size: 30px;

  ${THEME.breakpoints.down('md')} {
    font-size: 24px;
  }
`;

const SectionTitle = ({ title, backTo, ...containerProps }: IProps) => {
  return (
    <Container {...containerProps}>
      {backTo && (
        <StyledBackToLink to={backTo}>
          <ArrowBackIosIcon />
        </StyledBackToLink>
      )}
      <TitleText>{title}</TitleText>
    </Container>
  )
}

export default SectionTitle;
