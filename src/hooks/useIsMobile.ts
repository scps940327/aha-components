import { useMediaQuery } from "@mui/material";
import THEME from "helpers/theme";

const useIsMobile = () => useMediaQuery(THEME.breakpoints.down('md'));

export default useIsMobile;