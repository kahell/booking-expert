import React, { Component } from 'react';
import createStore from './App/redux';
import { Provider } from 'react-redux';
import RootContainer from './App/navigation/RootContainer';
import './App/config/ReactotronConfig';
import './App/config';
import DebugConfig from "./App/config/DebugConfig";


// create our data store
const store = createStore();
//Test
class App extends Component {
  render() {
      return (
          <Provider store={store}>
              <RootContainer />
          </Provider>
      );
  }
}

// allow reactotron overlay for fast design in dev mode
export default DebugConfig.useReactotron
    ? console.tron.overlay(App)
    : App
