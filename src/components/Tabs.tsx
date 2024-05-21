import { Tabs as RawTabs } from "@mui/material";
import styled from "styled-components";

const Tabs = styled(RawTabs)`
  .MuiTab-root {
    color: #929292;
    text-transform: none;

    &.Mui-selected {
      color: #ffffff;
    }
  }
`;

export default Tabs;
