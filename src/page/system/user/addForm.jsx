import React, {Component} from 'react'
import {Form, Input, Select, Cascader} from 'antd'

const {Item} = Form
const {Option} = Select

class ContentForm extends Component {

    constructor(props) {
        super(props);
        const {accountName} = this.props.record
        this.state = {
            accountName: accountName
        }
    }

    updateRole = (roleList) => {
        return (
            <Select
                allowClear
                placeholder="请选择"
            >
                {
                    roleList.map(item => {
                        return (
                            <Option value={item.id} key={item.id}>{item.name}</Option>
                        )
                    })
                }
            </Select>
        )
    }

    getOrgIds = (orgList) => {
        orgList.map(item => {
            if (item.children.length > 0) {
                console.log(item.id);
                this.getOrgIds(item.children)
            }
        })
    }

    componentWillMount() {
        this.props.setForm()
    }

    componentDidMount() {
        console.log(this.props);
        this.getOrgIds(this.props.orgList)
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
        const fieldNames = {
            label: 'name',
            value: 'id',
            children: 'children'
        }

        const {accountName} = this.state
        const {orgList, record} = this.props
        return (
            <Form {...formItemLayout}>
                <Item label="所属机构">
                    {getFieldDecorator('orgId', {
                        initialValue: [1, 2, 4] || [],
                        rules: [{required: true, message: 'Please input your username!'}],
                    })(
                        <Cascader
                            fieldNames={fieldNames}
                            options={orgList}
                            changeOnSelect
                        />
                    )}
                </Item>
                <Item label="账号名称">
                    {getFieldDecorator('accountName', {
                        initialValue: accountName || "",
                        rules: [{required: true, message: 'Please input your username!'}],
                    })(
                        <Input placeholder="请输入角色名称"/>,
                    )}
                </Item>
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