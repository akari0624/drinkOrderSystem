import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import reducers from './reducers';
import VendorMain from './_vendor/container/VendorAddMain';
import MainLandingPage from './_main_landing_page/container/LandingPageMain';
import MakeOrder from './_makeOrder/container/MakeOrderMain';
import MakingOrderConfirming from './_makeOrder/container/MakingOrderConfirming';
import ActionLoggerMiddleware from './middleware/ActionLogger';
import reduxThunk from 'redux-thunk';

const LOCAL_STORAGE_KEY = 'customerServiceList';

const createStoreWithMiddleware = applyMiddleware(
    ActionLoggerMiddleware,
    reduxThunk
)(createStore);

const appStore = createStoreWithMiddleware(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
    <Provider store={appStore}>
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path="/vendor" component={VendorMain} />
                    <Route path="/make_order" component={MakeOrder} />
                    <Route path="/make_order_confirming/:index" component={MakingOrderConfirming} />
                    <Route path="/" component={MainLandingPage} />
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>,
    document.querySelector('.container')
);
