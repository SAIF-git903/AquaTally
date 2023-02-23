import React from 'react'
import NavContainer from './src/Navigation/NavContainer'
import { store, persistor } from './src/Redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import Splash from './src/Screens/SplashScreen'
import LineChartComp from './src/Components/LineChart'


const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavContainer />
      </PersistGate>
    </Provider>
    // <LineChartComp />
  )
}

export default App
