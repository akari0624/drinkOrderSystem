import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import reducers from "./reducers";
import VendorMain from './vendor/container/VendorAddMain';

const LOCAL_STORAGE_KEY = "customerServiceList";

const createStoreWithMiddleware = applyMiddleware()(createStore);



const appStore = createStoreWithMiddleware(reducers);



ReactDOM.render(
  <Provider store={appStore}>
    <BrowserRouter>
      <div>

        <Switch>
          <Route path="/" component={VendorMain} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.querySelector(".container")
);


