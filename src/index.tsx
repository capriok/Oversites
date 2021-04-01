import React from 'react';
import ReactDOM from 'react-dom';
import { globalState } from './state/global-context/global'
import { globalReducer } from './state/global-context/reducer'
import { GlobalProvider } from "./state/global-context/state";
import App from './app';

import './styles/root/index.scss'

function Index() {
  return (
    <GlobalProvider globalState={globalState} globalReducer={globalReducer}>
      <App />
    </GlobalProvider>
  )
}

ReactDOM.render(<Index />, document.getElementById('root'))