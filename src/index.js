import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {createStore,combineReducers,compose,applyMiddleware} from 'redux';
import {Provider} from 'react-redux'
import {BrowserRouter} from'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import  burgerBuilderReducer from "./store/reducers/burgerBuilderReducer";
import orderReducer from './store/reducers/ordersReducer';
import authReducer from './store/reducers/authReducer'
import thunk from 'redux-thunk';
const composeEnhancers = process.env.NODE_ENV==='development'?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :compose;
const  rootReducer=combineReducers({
    burgerBuilder:burgerBuilderReducer,
    orders:orderReducer,
    auth:authReducer
});
const store=createStore(rootReducer,composeEnhancers(
    applyMiddleware(thunk)
));
const app=(
    <Provider store={store}>
    <BrowserRouter>
        <App/>
    </BrowserRouter>
    </Provider>
)
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
