import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from "./component/Navbar";
import CartList from "./component/CartList";
import { Provider } from 'react-redux';
import store from './store/store';
import PriceBox from './component/PriceBox';
import ResetModal from "./component/resetModal";

function App() {

  return (
    <Provider store={store}>
      <ResetModal/>
      <Navbar />
      <CartList />
      <PriceBox />
    </Provider>

  );
}

export default App
