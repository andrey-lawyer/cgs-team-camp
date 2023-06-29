import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import HomePageContainer from '../home';
import { APP_KEYS } from '../common/consts';
import { Layout } from '../common/components/layout';
import TodosContainer from '../todos';
import TodoIdContainer from '../todo-id';
import SignUPContainer from '../sign-up';
import LoginContainer from '../login';
import ForgetPasswordContainer from '../forget-password';
import ChangePasswordContainer from '../change-password';
import VerificationContainer from '../verification';
import { IsLoggedInContext } from '../common/components/isloggedin-context';

export const MainRouter = () => {
  const { isLoggedIn, loggedIn } = useContext(IsLoggedInContext);
  useEffect(() => {
    const savedState = localStorage.getItem('token');
    if (savedState) {
      loggedIn();
    }
  }, []);
  return (
    <Router>
      <Routes>
        <Route element={<Layout />} path={APP_KEYS.ROUTER_KEYS.ROOT}>
          <Route index element={<HomePageContainer />} />
          <Route element={<SignUPContainer />} path={APP_KEYS.ROUTER_KEYS.REGISTER} />
          <Route element={<LoginContainer />} path={APP_KEYS.ROUTER_KEYS.LOGIN} />

          <Route element={<TodosContainer />} path={APP_KEYS.ROUTER_KEYS.TODOS} />
          <Route element={<TodoIdContainer />} path={APP_KEYS.ROUTER_KEYS.TODOID} />
          <Route
            element={<ForgetPasswordContainer />}
            path={APP_KEYS.ROUTER_KEYS.FORGET_PASSWORD}
          />
          <Route
            element={<ChangePasswordContainer />}
            path={APP_KEYS.ROUTER_KEYS.CHANGE_PASSWORD}
          />
          <Route element={<VerificationContainer />} path={APP_KEYS.ROUTER_KEYS.VERIFICATION} />
        </Route>
        <Route path={APP_KEYS.ROUTER_KEYS.NOROUTE} element={<HomePageContainer />} />
      </Routes>
    </Router>
  );
};
