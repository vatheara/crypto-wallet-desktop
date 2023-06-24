import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import './index.css'
import { WalletProvider } from './provider/WalletNetworkProvider.tsx'
import './App.css'
import Routes from './Routes.tsx'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <WalletProvider>
      <Routes />
    </WalletProvider>
  </React.StrictMode>,
)
