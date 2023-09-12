import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import {
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu } from "@material-ui/icons";
import clsx from "clsx";

import logoImg from "../images/Logo_white.png";

const navItems = {
  menuList: [
    { title: "Home", address: "/" },
    { title: "About", address: "/about" },
    { title: "Login", address: "/login" },
  ],
};

const HeaderWrap = styled.header`
  && {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    padding: 1rem 2rem;
    max-width: 1280px;
    width: 100%;
    /* background-color: rgba(52, 73, 94, 0.2); */
    text-align: center;
    color: #fff;
    box-sizing: border-box;
    z-index: 1000;
  }

  &.mobile {
    padding: 0.5rem 1rem;
  }
`;

// 로고 정의
const LogoArea = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;

  &.active .inner {
    width: 156px;
    height: 153px;
    /* height: 104px; */
    &:hover {
      transform: rotate3d(1, 1, 1, 25deg);
    }
  }

  &.mobile .inner {
    width: 106px;
    height: 104px;
  }

  .inner {
    width: 106px;
    height: 153px;
    overflow: hidden;
    transition: 0.3s;
  }

  & img {
    max-width: 100%;
  }
`;

const LinkList = styled(Link)`
  color: #fff;
  text-shadow: 0px 0px 4px black;
  & + & {
    margin-left: 1rem;
  }
`;

const MenuList = styled.nav`
  position: absolute;
  right: 40px;
  top: 30px;
  bottom: 0;
  display: flex;
  & ul {
    display: flex;

    li + li {
      margin-left: 1rem;
    }
  }
`;

const MobileMenuArea = styled.nav`
  position: absolute;
  right: 20px;
  top: 20px;
  bottom: 0;
`;

const MobileMenuButton = styled(Button)`
  && {
    min-width: auto;
  }
  & svg {
    width: 1.5em;
    height: 1.5em;

    & path {
      fill: #fff;
    }
  }
`;

const MobileMenuList = styled(Box)`
  display: flex;
  padding: 0;
  width: 150px;
  justify-content: center;

  & ul {
    width: 100%;
  }

  & .MuiListItem-button {
    text-align: center;
  }
`;
interface Iplatform {
  isMobile: string;
}
interface ToggleTypeInterface {
  type: string;
  key: string;
}

const _ = ({ isMobile }: Iplatform) => {
  const history = useNavigate();
  const location = useLocation();
  const [mobileMenu, setMobileMenu] = useState<boolean>(false);

  // useState
  const [scrollTopAnimation, setScrollTopAnimation] = useState(
    location.pathname === "/" ? true : false
  );

  // variable
  const toggleDrawer = useCallback(
    (open: boolean) => (event: ToggleTypeInterface) => {
      if (
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }

      setMobileMenu(open);
    },
    []
  );

  const mobileLinkClick = useCallback(
    (address: string) => {
      history(address);
      toggleDrawer(false);
    },
    [history, toggleDrawer]
  );

  useEffect(() => {
    if (location.pathname !== "/") {
      setScrollTopAnimation(true);
    } else if (location.pathname === "/") {
      setScrollTopAnimation(false);
    }
  }, [location.pathname]);

  return (
    <>
      <HeaderWrap className={isMobile}>
        <LogoArea
          className={clsx(scrollTopAnimation ? "active" : "", isMobile)}
        >
          <Box className="inner">
            <LinkList to="/">
              <img src={logoImg} alt="분다 로고" />
            </LinkList>
          </Box>
        </LogoArea>

        {isMobile === "mobile" ? (
          <>
            <MobileMenuArea>
              <MobileMenuButton onClick={() => toggleDrawer(true)}>
                <Menu />
              </MobileMenuButton>
            </MobileMenuArea>

            <Drawer
              anchor="right"
              open={mobileMenu}
              onClose={toggleDrawer(false)}
            >
              <MobileMenuList>
                <List>
                  {navItems.menuList.map((props, i) => (
                    <Box component="li" key={i}>
                      <ListItem
                        button
                        onClick={() => {
                          mobileLinkClick(props.address);
                          setMobileMenu(false);
                        }}
                      >
                        <ListItemText primary={props.title} />
                      </ListItem>
                    </Box>
                  ))}
                </List>
              </MobileMenuList>
            </Drawer>
          </>
        ) : (
          <MenuList>
            <Box component="ul">
              {navItems.menuList.map((props, i) => (
                <Box component="li" key={i}>
                  <LinkList to={props.address}>{props.title}</LinkList>
                </Box>
              ))}
            </Box>
          </MenuList>
        )}
      </HeaderWrap>
    </>
  );
};

export default _;
