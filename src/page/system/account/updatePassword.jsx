import React, {Component} from "react"
import {Form, Input, Icon} from 'antd'
import { withRouter } from 'react-router-dom'
import './index.less'

const {Item} = Form

class UpdatePwd extends Component {
    state = {
        confirmDirty: false
    }

    componentWillMount() {
        this.props.setForm(this.props.form, this.props.history)
    }

    /**
     * 验证两次密码是否一致
     * @param e
     */
    compareToFirstPassword = (rule, value, callback) => {
        const {form} = this.props;
        if (value && value !== form.getFieldValue('accountPasswd')) {
            callback('两次密码不一致!');
        } else {
            callback();
        }
    };
    handleConfirmBlur = e => {
        const {value} = e.target;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form labelCol={{span: 5}} wrapperCol={{span: 19}}>
                <Item label="当前密码">
                    {getFieldDecorator('oldPasswd', {
                        rules: [{required: true, message: '密码不能为空!'}],
                    })(
                        <Input.Password
                            prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            placeholder="请输入密码"
                        />,
                    )}
                </Item>
                <Item label="新密码">
                    {getFieldDecorator('accountPasswd', {
                        rules: [{required: true, message: '密码不能为空!'}],
                    })(
                        <Input.Password
                            prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            placeholder="请输入密码"
                        />,
                    )}
                </Item>
                <Item label="确认新密码">
                    {getFieldDecorator('pwdOk', {
                        rules: [
                            {
                                required: true,
                                message: '密码不能为空',
                            },
                            {
                                validator: this.compareToFirstPassword,
                            },
                        ],
                    })(
                        <Input.Password
                            prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            placeholder="请输入密码"
                            onBlur={this.handleConfirmBlur}
                        />,
                    )}
                </Item>
            </Form>
        )
    }
}

const WrappedNormalUpdatePwd = Form.create({name: 'normal_updatePwd'})(UpdatePwd)
export default withRouter(WrappedNormalUpdatePwd)