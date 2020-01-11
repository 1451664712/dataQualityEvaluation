import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {LocaleProvider} from 'antd';
import zh_CN from 'antd/es/locale-provider/zh_CN';
import Login from "./page/login/login-form";
import Index from "./page/layout";

export default class App extends Component {
    render() {
        return (
            <LocaleProvider locale={zh_CN}>
                <BrowserRouter>
                    <Switch>
                        <Route path="/login" component={Login}></Route>
                        <Route path="/" component={Index}></Route>
                    </Switch>
                </BrowserRouter>
            </LocaleProvider>

        )
    }
}
