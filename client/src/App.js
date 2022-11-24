import React from "react";
// import Home from "./Pages/home";
import 'bootstrap/dist/css/bootstrap.min.css';
import { legacy_createStore as createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import './css/reset.css'
import './App.css'
import { Provider } from "react-redux";
import Routers from "./router/Routers";
import logger from "redux-logger";
import rootReducer from "./reducers";
import { persistStore } from "redux-persist"; // load
import { PersistGate } from "redux-persist/integration/react"; // load


// 배포 레벨에서는 리덕스 발동시 찍히는 logger를 사용하지 않습니다.
const enhancer =
  process.env.NODE_ENV === "production"
    ? compose(applyMiddleware())
    : composeWithDevTools(applyMiddleware(logger));

// 위에서 만든 reducer를 스토어 만들때 넣어줍니다
const store = createStore(rootReducer, enhancer);
const persistor = persistStore(store);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routers />
      </PersistGate>
    </Provider>
  );
};

export default App;
