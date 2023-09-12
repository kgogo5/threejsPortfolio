import { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { Box, Typography } from "@material-ui/core";
import { Link, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import clsx from "clsx";

import logoImg from "../images/Logo_white.png";
import SimpleLogoImg from "../images/simple_logo_white.png";

const FooterWrap = styled.footer`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0px;
  padding: 20px 0;
  text-align: center;
  z-index: 1000;
  overflow: hidden;

  & .animationBox {
    transform: translate(0px, -20px);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 264px;
    height: 264px;
    align-items: center;
    clip-path: circle();
    background-color: #2c3e50;
    opacity: 0;

    &.mobile {
      transform: translate(0px, 50px);
      width: 140px;
      height: 140px;
      & br {
        display: none;
      }
    }
  }

  &.active {
    margin-top: 50px;
    position: static;
  }
`;

const GridBox = styled(Box)`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  &.mobile {
    margin-top: 0.5rem;
  }
`;

const Inner = styled(Box)`
  & p {
    font-size: 14px;
    color: #fff;
  }
  & a {
    font-size: 14px;
    color: #fff;
  }

  &.mobile {
    P {
      font-size: 11px;
    }
  }
`;

const LinkList = styled(Link)`
  color: #fff;
  text-shadow: 0px 0px 4px black;
  & + & {
    margin-left: 1rem;
  }

  & img {
    width: 80px;
  }

  &.mobile img {
    width: 50px;
  }
`;
interface Iplatform {
  isMobile: string;
}

const _ = ({ isMobile }: Iplatform) => {
  const location = useLocation();
  const [mainAction, setMainAction] = useState<boolean>(false);
  const boxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.to(boxRef.current, {
      y: -10,
      delay: 1,
      duration: 0.5,
      opacity: 0.8,
    });
  }, []);

  useEffect(() => {
    if (location.pathname === "/about") {
      setMainAction(true);
    } else {
      setMainAction(false);
    }
  }, [location.pathname]);

  return (
    <>
      <FooterWrap className={mainAction ? "active" : ""}>
        <div className={clsx("animationBox", isMobile)} ref={boxRef}>
          <LinkList className={isMobile} to="/">
            {!isMobile ? (
              <img src={logoImg} alt="분다 로고" />
            ) : (
              <img src={SimpleLogoImg} alt="분다 로고" />
            )}
          </LinkList>
          <GridBox className={isMobile}>
            <Inner className={isMobile}>
              {/* <Typography>
              <Box mr={2} component="span">
                대표 : 한범희
              </Box>
              대표 전화 : <a href="tel:01080336920">010-8033-6920</a>
            </Typography> */}
              <Typography>
                Copyright
                <br /> © <br />
                2021 Bunda team. <br />
                모든 권리 보유.
              </Typography>
            </Inner>
          </GridBox>
        </div>
      </FooterWrap>
    </>
  );
};

export default _;
