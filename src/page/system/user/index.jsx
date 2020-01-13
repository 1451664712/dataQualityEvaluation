import React, {Component} from 'react'
import {Button, Card, Form, Select, Input, Cascader, Table, Modal, message, Icon} from 'antd'
import './index.less'
import {
    reqUserList,
    reqListOrganizationNoPage,
    reqListAccount,
    reqStopAccountById,
    reqStartAccountById,
    reqResetAccountPwdById
} from "../../../api/user";
import {PAGE_SIZE} from "../../../utils/config";
import AddForm from './addForm'

const {Item} = Form
const {Option} = Select
const {confirm} = Modal

class User extends Component {
    state = {
        roleList: [],
        orgList: [],
        loading: true,
        dataSource: [],
        roleId: "",
        orgId: "",
        accountName: "",
        name: "",
        limit: PAGE_SIZE, // 每页条数
        curPage: 1, // 当前页
        total: 0, //总数
        status: false //弹框状态
    }
    // 角色列表
    getUserList = () => {
        reqUserList().then(res => {
            if (res.code == '200') {
                this.setState({
                    roleList: res.result
                })
            }
        })
    }

    // 机构列表
    getListOrganizationNoPage = () => {
        reqListOrganizationNoPage().then(res => {
            if (res.code == '200') {
                console.log(res.result);
                this.setState({
                    orgList: res.result
                })
            }
        })
    }

    updateRole = (roleList) => {
        return (
            <Select
                allowClear
                style={{width: '250px'}}
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

    //显示弹框
    showAddData = () => {
        this.record = null
        this.setState({status: true})
    }

    // 编辑账号
    editHandleSubmit = (data) => {
        this.setState({status: true})
    }

    // 添加账号
    addUserRole = () => {

    }
    // 取消弹框
    handleCancel = () => {
        this.setState({status: false})
    }
    // 停用账号
    stopUser = (data) => {
        const content = (
            <span>
                停用后本账号将不能再登录相应系统，
                确定将账号名为“{data.accountName}” ,
                角色名为“{data.roleName}”的账号停用吗？
            </span>
        )
        if (data.status == '0') {
            reqStartAccountById(data.accountId).then(res => {
                if (res.code == '200')
                    message.success('操作成功')
                this.initTableData()
            })
            return false
        }
        confirm({
            title: "停用账号",
            content: content,
            onOk: () => {
                reqStopAccountById(data.accountId).then(res => {
                    if (res.code == '200')
                        message.success('操作成功')
                    this.initTableData()
                })
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    // 重置密码
    handleReset = (data) => {
        const {accountId, accountName, roleName} = data
        const content = (
            <span>
                确定将账号名为“{accountName}” , 角色名为“{roleName}”的账号的密码重置为初始密码吗？初始密码与账号相同
            </span>
        )
        confirm({
            title: "重置密码",
            content: content,
            onOk: () => {
                reqResetAccountPwdById({accountId, accountName}).then(res => {
                    if (res.code == '200')
                        message.success('操作成功')
                    this.initTableData()
                })
            }
        })
    }

    // 翻页
    changePage = (curPage) => {
        this.state.curPage = curPage
        this.initTableData()
    }

    // 显示总数
    showTotal = (total, range) => {
        return `${range[0]}-${range[1]} 共 ${total}`
    }

    // 设置表头
    initColumns = () => {
        this.columns = [
            {
                title: '账号名称',
                dataIndex: 'accountName',
                ellipsis: true,

            },
            {
                title: '角色',
                dataIndex: 'roleName',
                ellipsis: true,
            },
            {
                title: '所属机构',
                dataIndex: 'orgName',
                ellipsis: true,
            },
            {
                title: '真实姓名',
                dataIndex: 'name',
                ellipsis: true,
            },
            {
                title: '邮箱',
                dataIndex: 'email',
                ellipsis: true,
            },
            {
                title: "操作",
                width: 300,
                render: (text, record) => (
                    <span>
                        <Button
                            type="link"
                            style={{padding: '0', marginRight: '10px'}}
                            onClick={
                                () => {
                                    this.editHandleSubmit(record)
                                    this.record = record
                                }
                            }
                        >编辑</Button>
                        {
                            record.status ?
                                (
                                    <span>
                                        <Button
                                            type="link"
                                            style={{padding: '0', marginRight: '10px'}}
                                            onClick={
                                                () => {
                                                    this.stopUser(record)
                                                }
                                            }
                                        >停用账号</Button>
                                        <Button
                                            type="link"
                                            style={{padding: '0', marginRight: '10px'}}
                                            onClick={
                                                () => {
                                                    this.handleReset(record)
                                                }
                                            }
                                        >重置密码</Button>
                                    </span>
                                )
                                : <Button
                                    type="link"
                                    style={{padding: '0', marginRight: '10px'}}
                                    onClick={
                                        () => {
                                            this.stopUser(record)
                                        }
                                    }
                                >启用账号</Button>
                        }

                    </span>
                )
            }
        ];
    }

    // 初始表数据
    initTableData = () => {
        const {roleId, orgId, accountName, name, curPage, limit} = this.state
        reqListAccount({
            roleId,
            orgId,
            accountName,
            name,
            curPage,
            limit
        }).then(res => {
            if (res.code == '200') {
                this.setState({
                    dataSource: res.result.records,
                    total: res.result.total,
                    loading: false
                })
            }
        })
    }
    // 查询 && 查询
    handleSearch = (id) => {
        this.props.form.validateFields((err, values) => {
            // 查询
            if (id) {
                let orgId = null
                if (values.orgId && values.orgId.length > 0) {
                    orgId = values.orgId[values.orgId.length - 1]
                }
                const {accountName, name, roleId} = values
                this.setState({
                    orgId,
                    accountName,
                    name,
                    roleId,
                    curPage: 1
                }, () => {
                    this.initTableData()
                })
            } else {
                this.setState({
                    orgId: "",
                    accountName: "",
                    name: "",
                    roleId: ""
                }, () => {
                    this.props.form.resetFields()
                    this.initTableData()
                })
            }
        });
    }

    componentWillMount() {
        this.initColumns()
    }

    componentDidMount() {
        this.getUserList()
        this.getListOrganizationNoPage()
        this.initTableData()
    }

    render() {
        const extra = (
            <Button type="primary" onClick={this.showAddData}>新建角色</Button>
        )
        const {getFieldDecorator} = this.props.form;
        const {roleList, orgList, dataSource, loading, total, status} = this.state
        const fieldNames = {
            label: 'name',
            value: 'id',
            children: 'children'
        }
        let title = this.record && this.record.id ? '编辑账户' : '新建账户'
        return (
            <Card title="账号管理" extra={extra} bordered={false}>
                <Form layout="inline" className="form">
                    <Item label="角色">
                        {getFieldDecorator('roleId', {})(
                            this.updateRole(roleList)
                        )}
                    </Item>
                    <Item label="所属机构">
                        {getFieldDecorator('orgId', {
                            initialValue: "",
                        })(
                            <Cascader
                                style={{width: '250px'}}
                                fieldNames={fieldNames}
                                options={orgList}
                                onChange={this.onChange}
                                changeOnSelect
                            />
                        )}
                    </Item>
                    <Item label="账号名称">
                        {getFieldDecorator('accountName', {
                            initialValue: "",
                        })(
                            <Input style={{width: '250px'}} placeholder="请输入"/>
                        )}
                    </Item>
                    <Item label="真实姓名">
                        {getFieldDecorator('name', {
                            initialValue: "",
                        })(
                            <Input style={{width: '250px'}} placeholder="请输入"/>
                        )}
                    </Item>
                    <Item style={{marginLeft: 'auto', marginRight: '0'}}>
                        <Button style={{marginRight: "20px"}} onClick={() => {
                            this.handleSearch(0)
                        }}>重置</Button>
                        <Button type="primary" onClick={() => {
                            this.handleSearch(1)
                        }}>查询</Button>
                    </Item>

                </Form>
                <Table
                    bordered
                    rowKey="id"
                    loading={loading}
                    dataSource={dataSource}
                    columns={this.columns}
                    pagination={{
                        total: total,
                        showQuickJumper: true,
                        showTotal: this.showTotal,
                        onChange: this.changePage
                    }}
                />
                <Modal
                    destroyOnClose={true}
                    maskClosable={false}
                    title={title}
                    visible={status}
                    onOk={this.addUserRole}
                    onCancel={this.handleCancel}
                >
                    <AddForm
                        setForm={
                            (form) => {
                                this.form = form
                            }
                        }
                        roles={roleList}
                        record={this.record || {}}
                    />
                </Modal>
            </Card>
        )
    }
}

export default Form.create()(User)