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
  const [{ user, user: isAuth }] = useGlobalValue()
  const { loading } = useAuthStatus()

  const ProtectedRoute = ({ path, component: Component }) => (
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

  React.useEffect(() => {
    setTimeout(() => {
      user.isAuth && console.log({ Local: user })
    }, 500)
  }, [loading])

  if (loading) return (
    <Layout>
      <div style={{ position: 'absolute', top: '50vh', left: '50vw' }}><Loader /></div>
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



