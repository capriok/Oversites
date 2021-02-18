import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
// import { useGlobalValue } from 'state/state'

import Layout from 'components/root/layout'
import HomeNav from 'components/root/home-nav'
import Landing from 'components/root/landing'

import "styles/root/app.scss"

import Compose from 'components/compose/compose'
import Search from 'components/search/search'
import Authentication from 'components/auth/authentication'


const App: React.FC = () => {
  // const [{ user: { au: { isAuth } } }] = useGlobalValue()

  return (
    <Router>
      <Layout>
        <Route path='/' render={(props) => (
          <HomeNav props={props} />
        )} />
        <Route exact path='/' render={() => (
          <Landing />
        )} />
        <Route path='/login' render={(props) => (
          <Authentication props={props} />
        )} />
        <Route path='/search' render={() => (
          <Search />
        )} />
        <Route path='/compose' render={() => (
          <Compose />
        )} />
      </Layout>
    </Router>
  );
}

export default App



