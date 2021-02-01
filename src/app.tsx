import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Layout from 'components/root/layout'
import HomeNav from 'components/root/home-nav'
import Compose from 'components/root/compose'
import Browse from 'components/root/browse'
import Credentials from 'components/root/credentials'

import LOGO_PRIMARY from 'assets/logo_primary.png'
import { useGlobalValue } from 'state/state'

const App: React.FC = () => {
  const [{ user: { au: { isAuth } } }] = useGlobalValue()
  const [oversites, setOversites] = useState<Oversite[]>([])

  useEffect(() => {
    (async () => {
      const res = await fetch(process.env.REACT_APP_ENDPOINT + '/oversites' || '')
      const { data: oversites } = await res.json()
      setOversites(oversites)
    })()
  }, [])

  useEffect(() => {
    if (oversites.length > 0) console.log({ Oversites: oversites })
  }, [oversites])

  return (
    <Router>
      <Layout>
        {isAuth && <HomeNav />}
        <Route exact path='/' render={() => (
          <>
            {!isAuth && <HomeNav />}
            <div className="temp">
              <img src={LOGO_PRIMARY} alt="" style={{ width: '500px' }} />
            </div>
          </>
        )} />
        <Route path='/login' render={props => (
          <>
            <Credentials props={props} />
          </>
        )} />
        <Route path='/browse' render={() => (
          <>
            <Browse oversites={oversites} />
          </>
        )} />
        <Route path='/new-os' render={() => (
          <>
            <Compose />
          </>
        )} />
      </Layout>
    </Router>
  );
}

export default App



