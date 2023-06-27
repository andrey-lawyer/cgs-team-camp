import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { APP_KEYS } from '../../consts';
import { Container } from '../container';
import { Header, Nav, NavItem } from './layout.styled';

export const Layout = () => {
  return (
    <>
      <Header>
        <Container>
          <Nav>
            <NavItem to={APP_KEYS.ROUTER_KEYS.ROOT} end>
              Home
            </NavItem>
            <NavItem to={APP_KEYS.ROUTER_KEYS.TODOS}>todos</NavItem>
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
