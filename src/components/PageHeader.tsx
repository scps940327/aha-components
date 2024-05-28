import THEME from "helpers/theme";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { routes } from "../constants/route";
import LogoIcon from "./LogoIcon";

const PageHeaderContainer = styled.div`
  background-color: ${THEME.colors.BG_LIGHT};
  width: 80px;

  ${THEME.breakpoints.down('md')} {
    background-color: ${THEME.colors.BG_DARK};
    width: 100%;
    padding-left: 21px;
  }
`;

const LogoWrapper = styled.div`
  margin: 20px 0;
  text-align: center;

  ${THEME.breakpoints.down('md')} {
    text-align: left;
  }
`;

const MenuItemIcon = styled.div<{ isActive?: boolean }>`
  position: relative;
  width: 22px;
  height: 22px;
  display: inline-block;

  &::before {
    display: block;
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 11.92px;
    height: 10.92px;
    border-top: 3px solid ${({ isActive }) => isActive ? '#ffffff' : '#8A8A8F'};
    border-right: 3px solid ${({ isActive }) => isActive ? '#ffffff' : '#8A8A8F'};
    border-radius: 2px;
  }

  &:: after {
    display: block;
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: ${({ isActive }) => isActive ? '#ffffff' : '#8A8A8F'};
    border-radius: 2px;
    width: 15.12px;
    height: 15.12px;
  }
`;

const StyledMenuItem = styled(Link)<{ isActive?: boolean }>`
  color: ${({ isActive }) => isActive ? '#ffffff' : '#8A8A8F'};
  text-align: center;
  display: block;
  padding: 20px;

  ${THEME.breakpoints.down('md')} {
    padding: 0;
  }

  .menu-title {
    font-family: Ubuntu;
    font-size: 12px;
    font-weight: normal;
    line-height: 18px;
    letter-spacing: 0.4000000059604645px;
    min-width: 1px;

    ${THEME.breakpoints.down('md')} {
      display: none;
    }

  }
`;

const StyledMenuUl = styled.ul<{ isHome?: boolean }>`
  padding: 0;
  margin: 0;

  ${THEME.breakpoints.down('md')} {
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    background-color: ${THEME.colors.BG_LIGHT};
    box-shadow: 0px 0.5px 0px 0px #000000CC inset;
    display: ${({ isHome }) => isHome ? 'flex' : 'none'};
    align-items: center;
    justify-content: center;
    height: 66px;
  }

  > li {
    list-style-type: none;

    ${THEME.breakpoints.down('md')} {
      margin: 0 25px;
    }
  }
`;

const formatRoutePathToPathname = (path?: string) => path?.startsWith('/') ? path : `/${path}`;

const PageHeader = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const currentRouteConfig = routes.find(({ path = '' }) =>
    formatRoutePathToPathname(path) === location.pathname
);

  return (
    <PageHeaderContainer>
      <LogoWrapper>
        <LogoIcon />
      </LogoWrapper>
      <StyledMenuUl isHome={isHome}>
        {routes.map(({ path = '', title, id, isMenu }) => {
          if (!isMenu) {
            return null;
          }
          const isActive = Boolean(
            currentRouteConfig?.id &&
            currentRouteConfig?.id?.split('-')[0] === id?.split('-')[0]
          );
          return (
            <li key={id}>
              <StyledMenuItem to={formatRoutePathToPathname(path)} isActive={isActive} relative='path'>
                <MenuItemIcon isActive={isActive} />
                <div className="menu-title">{isActive ? title : ''}</div>
              </StyledMenuItem>
            </li>
          )
        })}
      </StyledMenuUl>
    </PageHeaderContainer>
  );
};

export default PageHeader;