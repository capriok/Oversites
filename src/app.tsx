import React from 'react'
import { BrowserRouter as Router, Route, Redirect, } from 'react-router-dom'
import { useGlobalValue } from 'state/state'

import Layout from 'components/root/layout'
import HomeNav from 'components/root/home-nav'
import Landing from 'components/root/landing'

import "styles/root/app.scss"

import Compose from 'components/compose/compose'
import Search from 'components/search/search'
import Authentication from 'components/auth/authentication'

const App: React.FC = () => {
  const [{ user: { isAuth } }] = useGlobalValue()

  const ProtectedRoute = ({ path, component: Component }:
    { path: string, component: React.FC<any> }) => (
    <>
      {
        isAuth
          ? <Route exact path={path} render={(props) => <Component props={props} />} />
          : window.location.pathname === path
            ? <Redirect to="/login" />
            : <Redirect to={window.location.pathname} />
      }
    </>
  )

  return (
    <Router>
      <Layout>
        <Route path='/' render={(props) => (
          <HomeNav props={props} />
        )} />
        <Route exact path='/' render={() => (
          <Landing />
        )} />
        <Route path='/auth' render={(props) => (
          <Authentication props={props} />
        )} />
        <Route exact path='/search' render={() => (
          <Search />
        )} />
        <ProtectedRoute path="/compose" component={Compose} />
      </Layout>
    </Router>
  );
}

export default App



