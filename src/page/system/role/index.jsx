import React, {Component} from 'react'
import {Button, Card, Table, Modal, message} from 'antd'
import AddForm from './addForm'
import Trees from './tree'
import './index.less'

import {PAGE_SIZE} from "../../../utils/config";
import {reqListSysRole, reqAddRole, reqUpdateRole, reqDeleteById, reqMenuList, reqUpdatePermission} from "../../../api/role";

const {confirm} = Modal;

class Role extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            showStatus: 0,
            state: false,
            roleState: false,
            dataSource: [],
            limit: PAGE_SIZE,
            curPage: 1,
            total: 0
        }
    }

    // 获取菜单数据
    initMenuList = () => {
        reqMenuList().then(res => {
            if (res.code == '200') {
                this.menuNodes = res.result
                localStorage.setItem('menuNodes', JSON.stringify(res.result))
            }
        })
    }
    // 添加按钮
    addUserAndUpdateUser = () => {
        this.form.validateFields((err, values) => {
            if (!err) {
                if (this.record && this.record.id) {
                    let id = this.record.id
                    reqUpdateRole({...values, id}).then(res => {
                        if (res.code == '200') {
                            this.form.resetFields();
                            message.success('修改成功')
                            this.setState({state: false})
                            this.initTableData()
                        }
                    })
                    return false
                }
                reqAddRole(values).then(res => {
                    if (res.code == '200') {
                        this.form.resetFields();
                        message.success('添加角色名成功')
                        this.setState({state: false})
                        this.initTableData()
                    }
                })
            }
        });
    }

    // 取消按钮
    handleCancel = () => {
        console.log(this.form);
        this.form.resetFields();
        this.setState({
            state: false,
        })
    }

    // 删除
    handleDelete = (data) => {
        let _this = this
        confirm({
            title: 'Do you Want to delete these items?',
            content: 'Some descriptions',
            onOk: () => {
                reqDeleteById(data.id).then(res => {
                    if (res.code == '200') {
                        message.success('删除成功')
                        this.initTableData()
                    }
                })
            },
            onCancel() {
                console.log('Cancel');
            },
        });

    }

    // 分配权限
    setRole = () => {
        this.setState({roleState: true})
    }

    // 添加权限
    addUserRole = () => {
        this.setState({roleState: true})
    }
    handleCancelRole = () => {
        this.setState({
            roleState: false
        })
    }
    // 显示弹框
    showAddData = () => {
        this.setState({
            state: true,
            showStatus: 0
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

    // 编辑
    editHandleSubmit = () => {
        this.setState({
            state: true,
            showStatus: 1
        })
    }
    // 设置表头
    initColumns = () => {
        this.columns = [
            {
                title: '角色名称',
                dataIndex: 'name',
                ellipsis: true,

            },
            {
                title: '角色描述',
                dataIndex: 'describe',
                ellipsis: true,
            },
            {
                title: '创建时间',
                dataIndex: 'createTime',
                ellipsis: true,
            },
            {
                title: '修改时间',
                dataIndex: 'updateTime',
                ellipsis: true,
            },
            {
                title: "操作",
                width: 300,
                render: (text, record) => (
                    <span>
                      <Button type="link" style={{padding: '0', marginRight: '10px'}}
                              onClick={() => {
                                  this.editHandleSubmit(record)
                                  this.record = record
                              }}>编辑</Button>
                         <Button type="link" style={{padding: '0', marginRight: '10px'}}
                                 onClick={() => {
                                     this.setRole(record)
                                     this.record = record
                                 }}>分配权限</Button>
                      <Button type="link" style={{padding: '0', marginRight: '10px'}}
                              onClick={() => {
                                  this.handleDelete(record)
                                  this.record = record
                              }}>删除</Button>
                    </span>
                )
            }
        ];
    }

    // 数据初始化
    initTableData = () => {
        this.setState({loading: true})
        const {limit, curPage} = this.state
        reqListSysRole({limit, curPage}).then(res => {
            if (res.code == '200') {
                this.setState({
                    dataSource: res.result.records,
                    total: res.result.total,
                    loading: false
                })
            }
        })
    }


    componentWillMount() {
        this.initColumns()
    }

    componentDidMount() {
        this.initTableData()
        this.initMenuList()
    }

    render() {
        const {loading, showStatus, state, dataSource, total, roleState} = this.state
        const extra = (
            <Button type="primary" onClick={this.showAddData}>新建角色</Button>
        )
        let title = null
        if (showStatus === 0) {
            title = '新建角色'
        } else if (showStatus === 1) {
            title = '编辑角色'
        } else {
            title = '分配权限'
        }
        return (
            <div className="role_box">
                <Card title={title} extra={extra} bordered={false}>
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
                        maskClosable={false}
                        title={title}
                        visible={state}
                        onOk={this.addUserAndUpdateUser}
                        onCancel={this.handleCancel}
                    >
                        <AddForm setForm={(form) => {
                            this.form = form
                        }} record={this.record}/>
                    </Modal>
                    <Modal
                        maskClosable={false}
                        title="分配权限"
                        visible={roleState}
                        onOk={this.addUserRole}
                        onCancel={this.handleCancelRole}
                    >
                        <Trees/>
                    </Modal>
                </Card>
            </div>
        )
    }
}

export default Role