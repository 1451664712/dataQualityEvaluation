import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux'
import store from './redux/store'

import App from './App';
import 'antd/dist/antd.less';

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root'));

