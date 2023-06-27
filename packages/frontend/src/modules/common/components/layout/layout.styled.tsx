import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Header = styled.header`
  top: 0;
  left: 0;
  z-index: 1100;
  align-items: center;
  min-height: 64px;
  padding-right: 24px;
  padding-left: 24px;
  padding-top: 12px;
  padding-bottom: 12px;
  color: #fff;
  background-color: #3f51b5;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14),
    0px 1px 10px 0px rgba(0, 0, 0, 0.12);
`;
export const Nav = styled('nav')`
  display: flex;
  justify-content: space-around;
`;

export const NavItem = styled(NavLink)`
  padding: ${(props) => props.theme.SPACES.spacing(2)};
  border-radius: ${(props) => props.theme.SPACES.spacing(1)};
  text-decoration: none;
  display: inline-block;
  margin-left: ${(props) => props.theme.SPACES.spacing(4)};
  margin-top: ${(props) => props.theme.SPACES.spacing(2)};
  color: white;

  &.active {
    background-color: white;
    color: #3f51b5;
  }
`;
