import { createGlobalStyle } from "styled-components";
const GlobalStyles = createGlobalStyle`
  * {
    font-family: 'Inter', sans-serif;
    /* You can also set other global styles here */
  }

  button{
    cursor:pointer;
  }
`;
export default GlobalStyles;
