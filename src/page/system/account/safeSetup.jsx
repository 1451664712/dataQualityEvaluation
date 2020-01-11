import React, {Component} from "react"
import {Button, Modal} from 'antd'
import './index.less'
import {connect} from 'react-redux'
import {receiveUser} from '../../../redux/actions'
import UpdatePwd from "./updatePassword";
import UpdateEmail from "./updateEmail"
import {removeToken} from "../../../utils/cookie";
import store from '../../../utils/store'
import {reqUpdateUserinfo} from "../../../api/user";

let sha1 = require('js-sha1')

class SafeSetup extends Component {
    state = {
        showStatus: 0,
        state: false
    }
    /**
     * 确认修改
     */
    addUserAndUpdateUser = () => {
        this.form.validateFields(async (err) => {
            if (!err) {
                const formData = this.form.getFieldsValue()
                const {email, oldPasswd, code} = formData
                console.log(email, oldPasswd, code);
                if (email) {
                    let req = {
                        email,
                        oldPasswd: sha1(oldPasswd)
                    }
                    reqUpdateUserinfo({req, code}).then(res => {
                        if (res.code == '200') {
                            this.form.resetFields();
                            store.saveUser(res.result)
                            this.props.receiveUser(store.getUser())
                            this.setState({state: false})
                        }
                    })
                    return false
                }
                const req = {
                    oldPasswd: sha1(formData.oldPasswd),
                    accountPasswd: sha1(formData.accountPasswd),
                }
                reqUpdateUserinfo(req).then(res => {
                    if (res.code == '200') {
                        this.form.resetFields();
                        this.setState({state: false})
                        localStorage.clear()
                        removeToken()
                        this.history.replace('/login')
                    }
                })
            }
        })
    }
    /**
     * 取消弹框
     */
    handleCancel = () => {
        this.form.resetFields();
        this.setState({
            state: false
        })
    }

    /**
     * 修改绑定邮箱
     */
    updateEmail = () => {
        this.setState({
            showStatus: 1,
            state: true
        })
    }

    /**
     * 修改密码
     */
    updatePwd = () => {
        this.setState({
            showStatus: 0,
            state: true
        })
    }

    render() {
        const {accountPasswd, email} = this.props.user
        let newEmail = email ? email : "暂无绑定邮箱"
        let lv = null
        if (accountPasswd.length < 40) {
            lv = '弱'
        } else if (accountPasswd.length >= 40 && accountPasswd.length < 80) {
            lv = '中等'
        } else {
            lv = '强'
        }
        const {showStatus, state} = this.state
        let title = showStatus === 1 ? '修改邮箱' : '修改密码';
        return (
            <div>
                <div className="setup_title">
                    <span>安全信息</span>
                </div>
                <ul className="setup_content">
                    <li>
                        <div className="setup-list-content">
                            <h4>账号密码</h4>
                            <p>密码强度: <strong> {lv}</strong></p>
                        </div>
                        <div className="setup-text">
                            <Button type="link" onClick={this.updatePwd}>修改</Button>
                        </div>
                    </li>
                    <li>
                        <div className="setup-list-content">
                            <h4>邮箱</h4>
                            <p>已绑定邮箱: {newEmail}</p>
                        </div>
                        <div className="setup-text">
                            <Button type="link" onClick={this.updateEmail}>修改</Button>
                        </div>
                    </li>
                </ul>
                <Modal
                    maskClosable={false}
                    destroyOnClose={true}
                    title={title}
                    visible={state}
                    onOk={this.addUserAndUpdateUser}
                    onCancel={this.handleCancel}
                >
                    {
                        showStatus === 1 ?
                            <UpdateEmail setForm={
                                (form) => {
                                    this.form = form
                                }
                            }/> :
                            <UpdatePwd setForm={
                                (form, history) => {
                                    this.form = form
                                    this.history = history
                                }
                            }/>
                    }
                </Modal>
            </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {receiveUser}
)(SafeSetup)