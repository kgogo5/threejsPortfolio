import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { Box } from "@material-ui/core";
import GlobalStyle from "../styles/common";
import { ThemeProvider } from "@material-ui/core/styles";
import clsx from "clsx";

import theme from "../theme";
import Header from "./Header";
import Footer from "./Footer";

const ContainerWrap = styled(Box)`
  && {
    position: relative;
    padding: 200px 0 380px;
    max-width: none;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: stretch;
    text-align: center;
    background: rgb(170, 75, 107);
    background: linear-gradient(
      135deg,
      rgba(170, 75, 107, 1) 0%,
      rgba(107, 107, 131, 1) 35%,
      rgba(59, 141, 153, 1) 100%
    );
    box-sizing: border-box;

    &.mobile {
      padding: 200px 0;
    }

    &.isAbout {
      padding: 200px 0 0;
      display: block;
    }
  }
  main {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: stretch;
    text-align: center;
  }
`;

interface ContainerInterface {
  children: JSX.Element;
  isMobile: string;
}

const _ = ({ children, isMobile }: ContainerInterface) => {
  const location = useLocation();
  const [mainAction, setMainAction] = useState(false);

  useEffect(() => {
    if (location.pathname === "/about") {
      setMainAction(true);
    } else {
      setMainAction(false);
    }
  }, [location.pathname]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <ContainerWrap className={clsx(isMobile, mainAction ? "isAbout" : "")}>
          <GlobalStyle />
          <Header isMobile={isMobile} />
          <Box component="main">{children}</Box>
          <Footer isMobile={isMobile} />
        </ContainerWrap>
      </ThemeProvider>
    </>
  );
};

export default _;
