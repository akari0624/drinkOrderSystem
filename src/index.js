import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import reducers from "./reducers";
import VendorMain from './_vendor/container/VendorAddMain';
import MainLandingPage from './_main_landing_page/container/LandingPageMain';
import ActionLoggerMiddleware from './middleware/ActionLogger';
import reduxThunk from 'redux-thunk';

const LOCAL_STORAGE_KEY = "customerServiceList";

const createStoreWithMiddleware = applyMiddleware(ActionLoggerMiddleware,reduxThunk)(createStore);



const appStore = createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());



ReactDOM.render(
  <Provider store={appStore}>
    <BrowserRouter>
      <div>

        <Switch>
          <Route path="/vendor" component={VendorMain} />
          <Route path="/" component={MainLandingPage} />
        </Switch>

      </div>
    </BrowserRouter>
  </Provider>,
  document.querySelector(".container")
);


