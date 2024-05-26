import { Box, CircularProgress } from "@mui/material";

const LoadingPanel = () => (
  <Box textAlign="center" padding="20px 0">
    <CircularProgress color="inherit" size="36px" />
  </Box>
);

export default LoadingPanel;
