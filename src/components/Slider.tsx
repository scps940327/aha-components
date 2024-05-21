import { Slider as RawSlider } from "@mui/material";
import THEME from "helpers/theme";
import styled from "styled-components";

const Slider = styled(RawSlider)`
  &.MuiSlider-root {
    border: 8px solid;
    border-image-source: linear-gradient(270deg, #FFD25F 0.13%, #FF5C01 100%);
    height: 8px;
    border: 0;
  }

  .MuiSlider-track {
    background: linear-gradient(270deg, #FFD25F 0.13%, #FF5C01 100%);
    height: 8px;
    border: 0;
  }

  .MuiSlider-rail {
    background-color: #ffffff;
    opacity: 0.3;
  }

  .MuiSlider-mark {
    width: 0;
    height: 0;
  }

  .MuiSlider-markLabel {
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0.15000000596046448px;
    color: #ffffff;
  }

  .MuiSlider-thumb {
    background: ${THEME.colors.backgroundPage};
    border: 6px solid #FFD05D;

    &:hover,
    &.Mui-focusVisible {
      box-shadow: none;
    }
  }
`;

export default Slider;
