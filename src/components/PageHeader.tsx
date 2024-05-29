import THEME from "helpers/theme";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { routes } from "../constants/route";
import LogoIcon from "./LogoIcon";
import SectionTitle from "./SectionTitle";

const PageHeaderContainer = styled.div`
  background-color: ${THEME.colors.BG_LIGHT};
  width: 80px;

  ${THEME.breakpoints.down('md')} {
    background-color: ${THEME.colors.BG_DARK};
    width: 100%;
    padding-left: 21px;
    height: 70px;
    display: flex;
    align-items: center;
  }
`;

const LogoWrapper = styled.div<{ isMobileSubPage?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  ${THEME.breakpoints.up('md')} {
    height: 88px;
  }

  ${THEME.breakpoints.down('md')} {
    ${({ isMobileSubPage }) => isMobileSubPage
      ? 'display: none;'
      : 'text-align: left;'
    }
  }
`;

const BackHomeWrapper = styled.div<{ isMobileSubPage?: boolean }>`
  display: none;

  ${THEME.breakpoints.down('md')} {
    ${({ isMobileSubPage }) => isMobileSubPage
      ? 'display: block;'
      : ''
    }
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

  ${THEME.breakpoints.up('md')} {
    display: block;
    padding: 7px;
    height: 42px;
  }

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

const StyledMenuUl = styled.ul<{ isMobileSubPage?: boolean }>`
  padding: 0;
  margin: 0;

  ${THEME.breakpoints.up('md')} {
    display: grid;
    gap: 8px;
  }

  ${THEME.breakpoints.down('md')} {
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    background-color: ${THEME.colors.BG_LIGHT};
    box-shadow: 0px 0.5px 0px 0px #000000CC inset;
    display: ${({ isMobileSubPage }) => isMobileSubPage ? 'none' : 'flex'};
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

const PageHeader = ({ isMobileSubPage }: { isMobileSubPage?: boolean }) => {
  const location = useLocation();
  const currentRouteConfig = routes.find(({ path = '' }) =>
    formatRoutePathToPathname(path) === location.pathname
);

  return (
    <PageHeaderContainer>
      <LogoWrapper isMobileSubPage={isMobileSubPage}>
        <LogoIcon />
      </LogoWrapper>
      <BackHomeWrapper isMobileSubPage={isMobileSubPage}>
        <SectionTitle title="Home Page" backTo="/" marginBottom="0" />
      </BackHomeWrapper>
      <StyledMenuUl isMobileSubPage={isMobileSubPage}>
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