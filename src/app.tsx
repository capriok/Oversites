import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Layout from 'components/layout'
import HomeNav from 'components/home-nav'
import Compose from 'components/compose'
import Browse from 'components/browse'
import Credentials from 'components/credentials'

import LOGO_PRIMARY from 'assets/logo_primary.png'

const App: React.FC = () => {

  const [oversites, setOversites] = useState<Oversite[]>([])

  useEffect(() => {
    (async () => {
      const res = await fetch(process.env.REACT_APP_ENDPOINT + '/oversites' || '')
      const { data } = await res.json()
      setOversites(data)
    })()
  }, [])

  useEffect(() => {
    if (oversites.length > 0) console.log({ oversites })
  }, [oversites])

  return (
    <Router>
      <Layout>
        <Route exact path='/' render={() => (
          <>
            <HomeNav />
            <div className="temp">
              <img src={LOGO_PRIMARY} alt="" style={{ width: '500px' }} />
            </div>
          </>
        )} />
        <Route path={`/login`} render={props => (
          <>
            <Credentials props={props} />
          </>
        )} />
        <Route path='/browse' render={() => (
          <>
            <Browse oversites={oversites} />
          </>
        )} />
        <Route path='/compose-os' render={() => (
          <>
            <Compose />
          </>
        )} />
      </Layout>
    </Router>
  );
}

export default App



