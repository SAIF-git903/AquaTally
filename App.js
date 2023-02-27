import 'react-native-gesture-handler';
import React from 'react'
import NavContainer from './src/Navigation/NavContainer'
import { store, persistor } from './src/Redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'


const App = () => {

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavContainer />
      </PersistGate>
    </Provider>
  )
}

export default App
