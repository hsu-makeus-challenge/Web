import Navbar from './components/Navbar'
import CartList from './components/CartList'
import { Provider } from 'react-redux'
import store, { persistor } from './store/store'
import PriceBox from './components/PriceBox'
import Modal from './components/Modal'
import { PersistGate } from 'redux-persist/integration/react'

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navbar />
        <CartList />
        <PriceBox />
        <Modal />
      </PersistGate>
    </Provider>
  )
}

export default App
