import React, {Component} from 'react'
import {Form, Input} from 'antd'

const {Item} = Form
const {TextArea} = Input


class NormalContentForm extends Component {
    componentWillMount() {
        this.props.setForm(this.props.form)
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 5},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 19},
            },
        };
        const {name, describe} = this.props.record
        return (
            <Form {...formItemLayout}>
                <Item label="角色名称">
                    {getFieldDecorator('name', {
                        initialValue: name || "",
                        rules: [{required: true, message: 'Please input your username!'}],
                    })(
                        <Input placeholder="请输入角色名称"/>,
                    )}
                </Item>
                <Item label="角色描述">
                    {getFieldDecorator('describe', {
                        initialValue: describe || "",
                        rules: [{required: true, message: 'Please input your username!'}],
                    })(
                        <TextArea placeholder="请输入内容"/>,
                    )}
                </Item>
            </Form>
        )
    }
}

const NormalForm = Form.create()(NormalContentForm)
export default NormalForm