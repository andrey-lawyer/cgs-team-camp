import { Suspense, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { APP_KEYS } from '../../consts';
import { Container } from '../container';
import { Header, LogOut, Nav, NavItem } from './layout.styled';
import { IsLoggedInContext } from '../isloggedin-context';
import { queryClient } from '../../../app';

export const Layout = () => {
  const { isLoggedIn, notLoggedIn } = useContext(IsLoggedInContext);
  const onLogout = () => {
    localStorage.removeItem('token');
    notLoggedIn();
    queryClient.clear();
  };
  return (
    <>
      <Header>
        <Container>
          <Nav>
            <NavItem to={APP_KEYS.ROUTER_KEYS.ROOT} end>
              Home
            </NavItem>
            <NavItem to={APP_KEYS.ROUTER_KEYS.TODOS}>Todos</NavItem>
            {isLoggedIn && <LogOut onClick={onLogout}>Logout</LogOut>}
          </Nav>
        </Container>
      </Header>
      <Suspense fallback={null}>
        <Container>
          <Outlet />
        </Container>
      </Suspense>
    </>
  );
};
