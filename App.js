import React, { Fragment } from 'react';
import { StatusBar, SafeAreaView } from 'react-native';
import MainRouteConfig from './src/MainRouteConfig';
import Navigator from './src/common/Navigator';
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import mainReducer from "./src/store/MainReducer";
import ReduxThunk from "redux-thunk";
import Loader from './src/components/Loader/Loader';
import logger from 'redux-logger'

export const store = createStore(
  mainReducer,
  applyMiddleware(ReduxThunk, logger)
);

const App = () => {
  return (
    <Provider store={store}>
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={{ flex: 1 }}>
          <Loader />
          <MainRouteConfig />
        </SafeAreaView>
      </Fragment>
    </Provider>
  );
};

export default App;
