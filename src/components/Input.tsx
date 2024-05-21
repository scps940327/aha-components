import TextField from '@mui/material/TextField';
import styled from 'styled-components';

const Input = styled(TextField)`
  .MuiOutlinedInput-root {
    &:hover {
      .MuiOutlinedInput-notchedOutline {
        border: 3px solid #FF9B33;
      }
    }
  }

  .MuiOutlinedInput-notchedOutline {
    border: 3px solid rgba(256, 256, 256, 0.5);
    border-radius: 6px;
  }

  .MuiOutlinedInput-root.Mui-focused {
    .MuiOutlinedInput-notchedOutline {
      border: 3px solid #FF9B33;
    }
  }

  .MuiInputBase-input {
    font-family: Ubuntu;
    font-size: 14px;
    font-weight: normal;
    line-height: 1.5;
    letter-spacing: 0.25px;
    color: #ffffff;
    padding: 17px 18px;
  }
`;

export default Input;
