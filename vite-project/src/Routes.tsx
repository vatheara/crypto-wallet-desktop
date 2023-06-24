import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

import WelcomePage from "./pages/WelcomePage";
import HelptUsPage from "./pages/HelpUsPage";
import CreateWalletPage from "./pages/CreateWalletPage";
import SecureWalletPage from "./pages/SecureWalletPage";
import RevealSecretPhrasePage from "./pages/RevealSecretPhrasePage";
import ConfirmSecretRecoveryPhrasePage from "./pages/ConfirmSecretRecoveryPhrasePage";
import ImportWalletPage from "./pages/ImportWalletPage";
import CreatePasswordPage from "./pages/CreatePasswordPage";
import WalletCreationSuccessfulPage from "./pages/WalletCreationSuccessfulPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import  AuthProvider  from './provider/AuthProvider'



 
const Routes = () => {

    const router = createBrowserRouter([
        {
          path: "/",
          element: <><WelcomePage/></>,
        },
        {
          path: "/home",
          element: <AuthProvider><HomePage/></AuthProvider>,
        },
        {
          path: "/help-us",
          element: <><HelptUsPage/></>
        },
        {
          path:"/create-wallet",
          element: <><CreateWalletPage/></>
        },
        {
          path: "/secure-wallet",
          element: <><SecureWalletPage/></>
        },
        {
          path:"/reveal-secret-phrase",
          element: <><RevealSecretPhrasePage/></>
        },
        {
          path:"/confirm-secret-recovery-phrase",
          element: <><ConfirmSecretRecoveryPhrasePage/></>
        },
        {
          path:"/import-wallet",
          element: <><ImportWalletPage/></>
        },
        {
          path:"/create-password",
          element: <><CreatePasswordPage/></>
        },
        {
          path:"/wallet-creation-successful",
          element: <><WalletCreationSuccessfulPage/></>
        },
        {
          path: "/login",
          element: <AuthProvider><LoginPage /></AuthProvider>
        },
        {
          path: "*",
          element: <AuthProvider><WelcomePage/></AuthProvider>,
        }
      ]);



    return (
        <RouterProvider router={router}/>
    )
}

export default Routes