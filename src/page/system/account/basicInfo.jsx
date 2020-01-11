import React, {Component} from 'react'
import './index.less'

import {Form, Icon, Input, Upload, Button, message} from 'antd'
import sotre from '../../../utils/store'
import {URL} from "../../../utils/config";
import {getToken} from "../../../utils/cookie";
import {reqUpdateUserinfo} from "../../../api/user";
import {connect} from 'react-redux'
import {receiveUser} from '../../../redux/actions'


const {Item} = Form

class BasicInfo extends Component {
    /**
     * 更新头像
     * */
    updateAvatar = (imgURL) => {
        // console.log(imgUrl);
        let req = {
            imgURL
        };
        reqUpdateUserinfo(req).then(res => {
            if (res.code == '200') {
                message.success('更新成功')
                sotre.saveUser(res.result)
                this.props.receiveUser(sotre.getUser())
            }
        })
    }
    /***
     * 修改真实姓名
     */
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (values.name) {
                    const req = {
                        name: values.name
                    }
                    reqUpdateUserinfo(req).then(res => {
                        if (res.code == '200') {
                            message.success('更新成功')
                            sotre.saveUser(res.result)
                            this.props.receiveUser(sotre.getUser())
                        }
                    })
                } else {
                    message.warning('请先完善信息')
                }
            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const props = {
            name: 'file',
            action: URL,
            showUploadList: false,
            headers: {
                authorization: getToken(),
            },
            onChange: ({file}) => {
                console.log(file);
                if (file.status === 'done') {
                    const imgUrl = file.response.src
                    this.updateAvatar(imgUrl)
                }
            },
        };
        const {name, imgUrl, accountName} = this.props.user

        return (
            <div>
                <div className="basic_title">
                    <span>基本信息</span>
                </div>
                <div className="basic_box">
                    <div className="basic_left">
                        <Form onSubmit={this.handleSubmit}>
                            <Item label="用户名">
                                <span>{accountName}</span>
                            </Item>
                            <Item label="真实姓名">
                                {getFieldDecorator('name', {
                                    initialValue: name,
                                })(<Input placeholder="请输入真实姓名"/>)}
                            </Item>
                            <Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    更新基本信息
                                </Button>
                            </Item>
                        </Form>
                    </div>
                    <div className="basic_right">
                        <div className="basic_avatar">头像</div>
                        <div className="basic_head">
                            <img src={imgUrl} alt=""/>
                        </div>
                        <div className="basic_upload">
                            <Upload {...props} accept="png, jpg, jpeg">
                                <Button>
                                    <Icon type="upload"/> 点击上传
                                </Button>
                            </Upload>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const FormData = Form.create()(BasicInfo)
export default connect(
    state => ({user: state.user}),
    {receiveUser}
)(FormData)