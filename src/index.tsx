import React from 'react';
import ReactDOM from 'react-dom';
import { globalState } from './state/global'
import { globalReducer } from './state/reducer'
import { GlobalProvider } from "./state/state";
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