import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import ActionLoggerMiddleware from './middleware/ActionLogger';
import reduxThunk from 'redux-thunk';
import {ThemeProvider} from 'styled-components';

import reducers from '@/reducers';
import VendorMain from '@/pages/_vendor/container/VendorAddMain';
import MakingOrderConfirming from '@/pages/_makeOrder/container/MakingOrderConfirming';
import Making_Order_Result_Report_Page from '@/pages/_makeOrder/container/Making_Order_Result_Report_Page';
import MakeOrder from '@/pages/_makeOrder/container/MakeOrderMain';
import JoinOrderMain from '@/pages/_joinOrder/container/JoinOrderMain';
import MainLandingPage from '@/pages/_main_landing_page/container/LandingPageMain';

import FBSignUpPage from '@/pages/signup/oauth/fb';
import RequireAuthHoc from '@/hoc/requireAuth';

import {FrontWebAppOrSubDirectoryBaseName} from '@/static/url';

import TermOfServicePage from '@/_law_things/terms_of_service';

/** 讓webpack打包時  會用file-loader把favicon.ico一起帶去dist資料夾  方便部署 */
import favicon from '@assets/favicon.ico';

const LOCAL_STORAGE_KEY = 'customerServiceList';

const theme = {
    mobileOneColumnWidth: '750px',
    padWidth: '980px'
};

const createStoreWithMiddleware = applyMiddleware(ActionLoggerMiddleware, reduxThunk)(createStore);

let appStore;
let routerBaseName ;
if (process.env.NODE_ENV === 'production') {
    routerBaseName = `/${FrontWebAppOrSubDirectoryBaseName}`;
    appStore = createStoreWithMiddleware(reducers);  
} else {
    /* in develop mode */
    routerBaseName = '';
    appStore = createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
}


ReactDOM.render(
    <Provider store={appStore}>
        <ThemeProvider theme={theme}>
            <BrowserRouter basename={routerBaseName}>

                <Switch>
                    <Route path="/vendor" component={RequireAuthHoc(VendorMain)}/>
                    <Route path="/make_order" component={RequireAuthHoc(MakeOrder)}/>
                    <Route path="/make_order_confirming/:index" component={MakingOrderConfirming}/>
                    <Route
                        path="/making_order_result/"
                        component={Making_Order_Result_Report_Page}/>
                    <Route path="/order/join/:orderId" component={RequireAuthHoc(JoinOrderMain)}/>
                    <Route path="/fb_sign_up" component={FBSignUpPage} />
                    <Route path="/termofservice" component={TermOfServicePage} />
                    <Route path="/" component={MainLandingPage}/>
                </Switch>

            </BrowserRouter>
        </ThemeProvider>
    </Provider>, document.querySelector('.container'));
