import React, {Component} from 'react'
import {Form, Input, Select} from 'antd'
import {PAGE_SIZE} from "../../../utils/config";

const {Item} = Form

class ContentForm extends Component {

    constructor(props) {
        super(props);
        const {accountName} = this.props.record
        this.state = {
            accountName: accountName
        }
    }

    componentWillMount() {
        console.log(this.props);
        this.props.setForm()
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
        const {accountName} = this.state
        return (
            <Form {...formItemLayout}>
                <Item label="角色名称">
                    {getFieldDecorator('name', {
                        initialValue: accountName || "",
                        rules: [{required: true, message: 'Please input your username!'}],
                    })(
                        <Input placeholder="请输入角色名称"/>,
                    )}
                </Item>
            </Form>
        )
    }
}

export default Form.create()(ContentForm)