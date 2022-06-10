import React from 'react';
import { Provider } from 'react-redux'
import { store } from './redux/store/store'
import {
  ChakraProvider,
} from '@chakra-ui/react';
import theme from './chackraExtended'
import { Home } from './pages';

/**
 * 
 * HERE WE CAN SEE 2 PROVIDERS
 * ONE FOR REDUX AND THE OTHER ONE FOR CHAKRAUI
 */

function App() {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Home />
      </ChakraProvider>
    </Provider>
  );
}

export default App;
