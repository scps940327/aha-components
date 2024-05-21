import RawButton from '@mui/material/Button';
import styled from 'styled-components';

const baseStyle = `
  text-transform: none;
`;

const NormalButton = styled(RawButton)`
  &.MuiButtonBase-root {
    ${baseStyle}
    padding: 13px 16px 13px 16px;
    background-color: #ffffff;
    font-size: 14px;
    font-weight: 700;
    color: #121212;
  }
`;


const OutlinedButton = styled(RawButton)<{ isActive?: boolean }>`
  &.MuiButtonBase-root {
    ${baseStyle}
    background-color: ${({ isActive }) => isActive ? '#ffffff' : '#121212'};
    color: ${({ isActive }) => isActive ? '#121212' : '#ffffff'};
    padding: 8px 10px 8px 10px;
    border-radius: 20px;
    border: 1px solid #ffffff;

    &:hover {
      background-color: ${({ isActive }) => isActive ? '#121212' : '#ffffff'};
      color: ${({ isActive }) => isActive ? '#ffffff': '#121212'};
    }
  }
`;


const ContainedButton = styled(RawButton)`
  &.MuiButtonBase-root {
    ${baseStyle}
    background-color: #121212;
    color: #ffffff;
    padding: 8px 10px 8px 10px;
    border-radius: 20px;
    border: 1px solid #ffffff;

    :hover {
      background-color: #121212;
      color: #ffffff;
    }
  }
`;

const Button = {
  Normal: NormalButton,
  Outlined: OutlinedButton,
  Contained: ContainedButton,
};

export default Button;
