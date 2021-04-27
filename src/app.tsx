import React from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch, } from 'react-router-dom'
import { useGlobalValue } from 'state/global-context/state'

import Layout from 'components/root/layout'
import HomeNav from 'components/root/home-nav'
import Landing from 'components/root/landing'

import "styles/root/app.scss"

import Search from 'components/search/search'
import OversiteRouter from 'components/oversite/router.oversite'
import AuthRouter from 'components/auth/router.auth'
import useAuthStatus from 'hooks/useAuthStatus'
import Loader from 'components/common/loader'

const App: React.FC = () => {
  const [{ user, user: isAuth }] = useGlobalValue()
  const { loading } = useAuthStatus()

  const ProtectedRoute: React.FC<{ exact?: boolean; path: string; component: any }> =
    ({ exact = false, path, component: Component }) => (
      <>
        {
          isAuth
            ? <Route exact={exact} path={path} render={(props) => <Component props={props} />} />
            : window.location.pathname === path
              ? <Redirect to="/login" />
              : <Redirect to={window.location.pathname} />
        }
      </>
    )

  React.useEffect(() => {
    setTimeout(() => {
      user.isAuth && console.log({ Local: user })
    }, 500)
  }, [loading])

  if (loading) return (
    <Layout>
      <Loader centered />
    </Layout>
  )

  return (
    <Router>
      <Switch>
        <Layout>
          <Route path='/' render={() => (
            <HomeNav />
          )} />
          <Route exact path='/' render={() => (
            <Landing />
          )} />
          <Route path='/' render={(props) => (
            <AuthRouter props={props} />
          )} />
          <Route path='/search' render={() => (
            <Search />
          )} />
          <ProtectedRoute path="/oversite" component={OversiteRouter} />
        </Layout>
      </Switch>
    </Router>
  );
}

export default App
