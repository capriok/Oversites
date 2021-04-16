import React from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch, } from 'react-router-dom'
import { useGlobalValue } from 'state/global-context/state'

import Layout from 'components/root/layout'
import HomeNav from 'components/root/home-nav'
import Landing from 'components/root/landing'

import "styles/root/app.scss"

import Compose from 'components/compose/compose'
import Search from 'components/search/search'
import Authentication from 'components/auth/authentication'
import useAuthStatus from 'hooks/useAuthStatus'
import Loader from 'components/common/loader'

const App: React.FC = () => {
  const [{ user: { isAuth } }] = useGlobalValue()

  const { status, loading } = useAuthStatus()

  console.log('LOADING', loading);
  console.log('STATUS', status);

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

  if (loading) return (
    <Layout>
      <div style={{ position: 'absolute', top: '50vh', left: '50vw' }}><Loader /></div>
    </Layout>
  )

  return (
    <Router>
      <Switch>
        <Layout>
          <Route path='/' render={(props) => (
            <HomeNav props={props} />
          )} />
          <Route exact path='/' render={(props) => (
            <Landing />
          )} />
          <Route exact path='/search' render={() => (
            <Search />
          )} />

          <ProtectedRoute path="/compose" component={Compose} />

          <Route path='/' render={(props) => (
            <Authentication props={props} />
          )} />
        </Layout>
      </Switch>
    </Router>
  );
}

export default App



