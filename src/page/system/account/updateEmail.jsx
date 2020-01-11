import React, {Component} from "react"
import {Form, Input, Icon, Button, Row, Col, message} from 'antd'
import './index.less'
import {reqSendEmailCode} from "../../../api/user";
import {validateEmail} from '../../../utils/rule'

const {Item} = Form

class UpdateEmail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            disabled: false,
            time: 60,
            btnText: "获取验证码",
        }
    }

    compareToFirstEmail = (rule, value, callback) => {
        if (value) {
            if (validateEmail(value)) {
                callback()
            } else {
                callback('邮箱格式不正确');
            }
        } else {
            callback('请输入邮箱');
        }

    };
    /***
     * 获取邮箱验证码
     */
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(['email'], (err, value) => {
            if (!err) {
                this.timer()
                reqSendEmailCode(value.email).then(res => {
                    if (res.code == '200') {
                        message.success(res.result)
                    }
                })
            }
        });
    }
    /***
     * 倒计时
     */
    timer = () => {
        let {time} = this.state
        let siv = setInterval(() => {
            this.setState({
                time: (time--),
                btnText: (time + '秒后重试'),
                disabled: true
            }, () => {
                if (this.state.time <= 1) {
                    clearInterval(siv);
                    this.setState({btnText: '重新发送', disabled: false, time: 60})
                }
            })
        }, 1000)
    }

    componentWillMount() {
        this.props.setForm(this.props.form)
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {btnText, disabled} = this.state
        return (
            <Form labelCol={{span: 5}} wrapperCol={{span: 19}} onSubmit={this.handleSubmit}>
                <Item label="密码">
                    {getFieldDecorator('oldPasswd', {
                        rules: [{required: true, message: '密码不能为空!'}],
                    })(
                        <Input.Password
                            type="password"
                            prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            placeholder="请输入密码"
                        />,
                    )}
                </Item>
                <Item label="新邮箱">
                    <Row gutter={8}>
                        <Col span={16}>
                            {getFieldDecorator('email', {
                                rules: [
                                    {
                                        required: true,
                                        validator: this.compareToFirstEmail,
                                    },
                                ],
                            })(<Input
                                    prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                    placeholder="请输入密码"
                                />
                            )}
                        </Col>
                        <Col span={8} style={{textAlign: 'right'}}>
                            <Button type="primary" htmlType="submit" disabled={disabled}>{btnText}</Button>
                        </Col>
                    </Row>

                </Item>
                <Item label="验证码">
                    {getFieldDecorator('code', {
                        rules: [{required: true, message: '密码不能为空!'}],
                    })(
                        <Input
                            prefix={<Icon type="code" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            placeholder="请输入密码"
                        />,
                    )}
                </Item>
            </Form>
        )
    }
}

const WrappedNormalUpdateEmail = Form.create()(UpdateEmail)
export default WrappedNormalUpdateEmail