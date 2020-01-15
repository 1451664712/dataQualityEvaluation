import React from 'react'

import {Form, Icon, Input, Button, Spin} from 'antd';
import {connect} from 'react-redux'
import './login-form.less'
import storageUtils from '../../utils/store'
import {setToken} from "../../utils/cookie";
import {reqLogin} from "../../api";
import logo from "./images/pic_logo.png";
import {receiveUser} from '../../redux/actions'

let sha1 = require('js-sha1');

class NormalLoginForm extends React.Component {
    state = {
        loading: false
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let accountName = values.accountName
                let accountPasswd = sha1(values.accountPasswd)
                reqLogin({accountName, accountPasswd}).then(res => {
                    if (res.code == '200') {
                        storageUtils.saveUser(res.result.user)
                        setToken(res.result.token)
                        this.props.receiveUser(storageUtils.getUser())
                        this.props.history.push('/home')
                    }
                }).catch(err => {
                    console.log(err);
                })
            }
        });
    };

    render() {
        // const user = storageUtils.getUser()
        // if (user && user.id) {
        //     return <Redirect to="/index" />
        // }
        const {getFieldDecorator} = this.props.form;
        return (
            <div className="login_back">
                <h1 className="logo">
                    <img src={logo} alt=""/>
                </h1>
                <div className="login-box">
                    <div className="login-form-box">
                        <h2>安全登录</h2>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Item>
                                {getFieldDecorator('accountName', {
                                    rules: [{required: true, message: '请输入用户名!'}],
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                        placeholder="用户名"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('accountPasswd', {
                                    rules: [{required: true, message: '请输入密码!'}],
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                        type="password"
                                        placeholder="密码"
                                    />,
                                )}
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    登录
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

const WrappedNormalLoginForm = Form.create({name: 'normal_login'})(NormalLoginForm);
export default connect(
    state => ({user: state.user}),
    {receiveUser})
(WrappedNormalLoginForm)
