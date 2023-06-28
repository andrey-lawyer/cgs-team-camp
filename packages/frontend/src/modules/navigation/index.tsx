import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePageContainer from '../home';
import { APP_KEYS } from '../common/consts';
import { Layout } from '../common/components/layout';
import TodosContainer from '../todos';
import TodoIdContainer from '../todo-id';

export const MainRouter = () => (
  <Router>
    <Routes>
      <Route element={<Layout />} path={APP_KEYS.ROUTER_KEYS.ROOT}>
        <Route index element={<HomePageContainer />} />

        <Route element={<TodosContainer />} path={APP_KEYS.ROUTER_KEYS.TODOS} />
        <Route element={<TodoIdContainer />} path={APP_KEYS.ROUTER_KEYS.TODOID} />
      </Route>
      <Route path={APP_KEYS.ROUTER_KEYS.NOROUTE} element={<HomePageContainer />} />
    </Routes>
  </Router>
);
