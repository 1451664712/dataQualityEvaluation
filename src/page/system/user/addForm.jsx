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

    onChange = (val) => {
        console.log(val);
    }
    getOrgList = (data, id) => {
        for (let i = 0, len = data.length; i < len; i++) {
            if (data[i].id == id) {
                return [data[i].id];
            }
            if (data[i].children.length > 0) {
                let ro = this.getOrgList(data[i].children, id);
                if (ro !== undefined) {
                    return ro.concat(data[i].id);
                }
            }
        }
    }

    componentWillMount() {
        this.props.setForm(this.props.form)
        const {orgList} = this.props
        const {orgId} = this.props.record
        if (orgId && orgList.length > 0) {
            this.orgArr = this.getOrgList(orgList, orgId).reverse()
        }
    }


    render() {
        console.log(this.props);
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
        const {orgList, roles, disabled} = this.props
        const {accountName, name, email, roleId, id} = this.props.record
        return (
            <Form {...formItemLayout}>
                <Item label="所属机构">
                    {getFieldDecorator('orgId', {
                        initialValue: this.orgArr,
                        rules: [{type: 'array', required: true, message: '请选择所属机构'}],
                    })(
                        <Cascader
                            fieldNames={fieldNames}
                            options={orgList}
                            onChange={this.onChange}
                            changeOnSelect
                            placeholder="请选择"/>
                    )}
                </Item>
                <Item label="账号名称">
                    {getFieldDecorator('accountName', {
                        initialValue: accountName,
                        rules: [{required: true, message: '账号名称不能为空'}],
                    })(
                        <Input placeholder="请输入账号名称" disabled={disabled}/>,
                    )}
                </Item>
                {
                    id ? "" : (
                        <Item label="账号密码">
                            {getFieldDecorator('accountName', {})(
                                <Input type="password" disabled={disabled} placeholder="密码将自动生成"/>,
                            )}
                        </Item>
                    )
                }
                <Item label="真实姓名">
                    {getFieldDecorator('name', {
                        initialValue: name,
                        rules: [{required: true, message: '真实姓名不能为空'}],
                    })(
                        <Input placeholder="请输入角色名称" disabled={disabled}/>,
                    )}
                </Item>
                <Item label="邮箱">
                    {getFieldDecorator('email', {
                        initialValue: email,
                        rules: [
                            {
                                type: 'email',
                                message: '邮箱格式不正确',
                            },
                            {
                                required: true,
                                message: '邮箱不能为空',
                            },
                        ],
                    })(
                        <Input placeholder="请输入邮箱" disabled={disabled}/>,
                    )}
                </Item>
                <Item label="角色">
                    {getFieldDecorator('roleId', {
                        initialValue: roleId,
                        rules: [
                            {
                                required: true,
                                message: '请选择角色',
                            },
                        ],
                    })(
                        <Select
                            allowClear
                            placeholder="请选择"
                        >
                            {
                                roles.map(item => {
                                    return (
                                        <Option value={item.id} key={item.id}>{item.name}</Option>
                                    )
                                })
                            }
                        </Select>,
                    )}
                </Item>
            </Form>
        )
    }
}

export default Form.create()(ContentForm)