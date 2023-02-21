import { Text } from 'react-native'
import React from 'react'
import NavContainer from './src/Navigation/NavContainer'
import { store, persistor } from './src/Redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import Login from './src/Screens/Login'
import Signup from './src/Screens/SignUp'


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
