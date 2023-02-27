import React, { useEffect } from 'react'
import NavContainer from './src/Navigation/NavContainer'
import { store, persistor } from './src/Redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import AnimatedSearchBar from './src/Components/AnimatedSearchBar'

const App = () => {

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavContainer />
      </PersistGate>
    </Provider>
    // <AnimatedSearchBar />
  )
}

export default App
