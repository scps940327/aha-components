import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { routes } from "../constants/route";
import LogoIcon from "./LogoIcon";

const PageHeaderContainer = styled.div`
  background-color: #1b1b1b;
  width: 80px;
`;

const LogoWrapper = styled.div`
  margin: 20px 0;
  text-align: center;
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

  > div {
    font-family: Ubuntu;
    font-size: 12px;
    font-weight: normal;
    line-height: 18px;
    letter-spacing: 0.4000000059604645px;
    min-width: 1px;
  }
`;

const StyledMenuUl = styled.ul`
  padding: 0;
  margin: 0;
  > li {
    list-style-type: none;
  }
`;

const PageHeader = () => {
  const location = useLocation();

  return (
    <PageHeaderContainer>
      <LogoWrapper>
        <LogoIcon />
      </LogoWrapper>
      <StyledMenuUl>
        {routes.map(({ path, title, isMenu }) => {
          if (!isMenu) {
            return null;
          }
          const formattedPath = path.startsWith('/') ? path : `/${path}`;
          const isActive = formattedPath.split('/')[1] === location.pathname.split('/')[1];
          console.log('formattedPath', formattedPath);
          return (
            <li>
              <StyledMenuItem to={path} isActive={isActive}>
                <MenuItemIcon isActive={isActive} />
                <div>{isActive ? title : ''}</div>
              </StyledMenuItem>
            </li>
          )
        })}
      </StyledMenuUl>
    </PageHeaderContainer>
  );
};

export default PageHeader;