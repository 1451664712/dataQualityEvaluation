import React, {Component} from 'react'
import './index.less'
import {Row, Col, Card, Button, Table, Modal, message, Form, Cascader, Radio, Input, Select} from 'antd'
import EditTree from "./editTree"
import {
    reqListOrganization,
    reqListChildrenOrganizationById,
    reqDelOrganization,
    reqTreeOrg,
    reqAddOrganization,
    reqUpdateOrganization,
    reqForOrganization
} from "../../../api/organization";
import {PAGE_SIZE} from "../../../utils/config";

const {confirm} = Modal
const {Item} = Form
const {Group} = Radio
const {Option} = Select

class Organization extends Component {

    state = {
        loading: false,
        dataSource: [],
        orgList: [],
        showStatus: 0,
        show: false,
        disabled: false,
        addOrg: [
            {
                label: "机构代码",
                value: "code",
                type: "input",
                initialValue: "",
                rules: [{required: true, message: '机构代码不能为空!'}],
                disabled: false
            },
            {
                label: "机构名称",
                value: "name",
                type: "input",
                initialValue: "",
                rules: [{required: true, message: '机构名称不能为空!'}],
                disabled: false
            },
            {
                label: "上级机构",
                value: "pid",
                type: "select",
                initialValue: "",
                rules: [{required: true, message: '请选择上级机构!'}],
                disabled: true
            },
            {
                label: "机构负责人",
                value: "contact",
                type: "input",
                initialValue: "",
                rules: [{required: true, message: '机构负责人不能为空!'}],
                disabled: false
            },
            {
                label: "手机号",
                value: "telephone",
                type: "input",
                initialValue: "",
                rules: [{required: true, message: '手机号不能为空!'}],
                disabled: false
            },
            {
                label: "邮箱",
                value: "email",
                type: "input",
                initialValue: "",
                rules: [
                    {
                        type: 'email',
                        message: '邮箱格式不正确!',
                    },
                    {
                        required: true,
                        message: '邮箱不能为空!',
                    },
                ],
                disabled: false,
            },
            {
                label: "叶子节点",
                value: "level",
                type: "radio",
                initialValue: "",
                rules: [{required: true, message: '请选择是否为叶子节点!'}],
                disabled: false
            }
        ],
        orgIds: [],
        total: "",
        curPage: 1,
        limit: PAGE_SIZE
    }

    // 查询子机构
    listChildrenOrg = (orgId) => {
        reqListChildrenOrganizationById(orgId).then(res => {
            const dataSource = res.result
            const total = ""
            this.setState({dataSource, total})
        })
    }

    // 组织结构
    initOrg = () => {
        reqTreeOrg().then(res => {
            if (res.code == '200') {
                this.setState({
                    orgList: res.result,
                })
            }
        })
    }

    // 编辑
    handleEdit = (data) => {
        this.data = data
        reqForOrganization(data.id).then(res => {
            if (res.code == "200") {
                this.setState({orgIds: res.result})
            }
        })
        this.state.addOrg.forEach(item => {
            if (item.label === "机构代码")
                item.initialValue = data.code
            if (item.label === "机构名称")
                item.initialValue = data.name
            if (item.label === "上级机构")
                item.initialValue = data.pid
            if (item.label === "机构负责人")
                item.initialValue = data.contact
            if (item.label === "手机号")
                item.initialValue = data.telephone
            if (item.label === "邮箱")
                item.initialValue = data.email
            if (item.label === "叶子节点")
                item.initialValue = data.level
        })
        this.setState({
            show: true,
            showStatus: 2,
            disabled: false
        })
    }

    // 取消
    handleCancel = () => {
        this.setState({
            show: false,
            showStatus: 0
        })
        this.props.form.resetFields()
    }

    handelAdded = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const {code, contact, email, level, name, telephone} = values
                let pid = values.pid && values.pid.length > 0 ? values.pid[values.pid.length - 1] : ""
                let id = this.data.id
                if (id) {
                    reqUpdateOrganization({code, contact, email, level, name, telephone, pid, id})
                        .then(res => {
                            if (res.code == "200") {
                                message.success("操作成功")
                                this.setState({show: false, showStatus: 0})
                                this.initDataSource()
                                this.fn()
                            }
                        })
                    return false
                }
                reqAddOrganization(
                    {code, contact, email, level, name, telephone, pid}
                ).then(res => {
                    if (res.code == '200') {
                        message.success("操作成功")
                        this.setState({show: false, showStatus: 0})
                        this.initDataSource()
                        this.fn()
                    }
                })
            }
        });
    }
    // 新建
    handelNewly = () => {
        this.data = null
        this.state.addOrg.map(item => {
            item.initialValue = ""
        })
        this.setState({
            show: true,
            showStatus: 1,
            disabled: false
        })
    }

    // 删除
    handleDelete = (data) => {
        confirm({
            title: '提示',
            content: '你确定删除吗',
            onOk: () => {
                reqDelOrganization(data.id)
                    .then(res => {
                        console.log(res);
                        if (res.code == "200") {
                            message.success("操作成功")
                            this.initDataSource()
                            this.fn()
                        }
                    })
            }
        })
    }

    // 查看
    handelWatch = (data) => {
        this.state.addOrg.forEach(item => {
            if (item.label === "机构代码")
                item.initialValue = data.code
            if (item.label === "机构名称")
                item.initialValue = data.name
            if (item.label === "上级机构")
                item.initialValue = this.getOrgList(this.state.orgList, data.id).reverse()
            if (item.label === "机构负责人")
                item.initialValue = data.contact
            if (item.label === "手机号")
                item.initialValue = data.telephone
            if (item.label === "邮箱")
                item.initialValue = data.email
            if (item.label === "叶子节点")
                item.initialValue = data.level
        })
        this.setState({
            show: true,
            showStatus: 3,
            disabled: true
        })
    }

    // 查找父级
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

    // 初始化
    initDataSource = () => {
        const {curPage, limit} = this.state
        reqListOrganization({curPage, limit}).then(res => {
            if (res.code == '200') {
                const dataSource = res.result.records
                const total = res.result.total
                this.setState({dataSource, total})
            }
        })
    }

    // 设置表头
    initColumns = () => {
        this.columns = [
            {
                title: '机构代码',
                dataIndex: 'code',
                ellipsis: true,

            },
            {
                title: '机构名称',
                dataIndex: 'name',
                ellipsis: true,
            },
            {
                title: '上级机构',
                dataIndex: 'pname',
                ellipsis: true,
            },
            {
                title: '机构负责人',
                dataIndex: 'contact',
                ellipsis: true,
            },
            {
                title: '用户数',
                dataIndex: 'num',
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
                            onClick={() => {
                                this.handelWatch(record)
                            }}
                        >查看</Button>
                        <Button
                            type="link"
                            style={{padding: '0', marginRight: '10px'}}
                            onClick={() => {
                                this.handleEdit(record)
                            }}
                        >编辑</Button>
                        <Button
                            type="link"
                            style={{padding: '0', marginRight: '10px'}}
                            onClick={() => {
                                this.editHandleSubmit(record)
                            }}
                        >分配权限</Button>
                        <Button
                            type="link"
                            style={{padding: '0', marginRight: '10px'}}
                            onClick={() => {
                                this.handleDelete(record)
                            }}
                        >删除</Button>
                    </span>
                )
            }
        ];
    }

    // 翻页
    changePage = (curPage) => {
        this.setState({curPage}, () => {
            this.initDataSource()
        })
    }

    // 显示总数
    showTotal = (total, range) => {
        return `${range[0]}-${range[1]} 共 ${total}`
    }

    //Item
    getItem = (item) => {
        const fieldNames = {
            label: 'name',
            value: 'id',
            children: 'children'
        }
        let tree = this.state.orgList
        if (item.type === "input") {
            return (
                <Input placeholder={'请输入' + item.label} disabled={this.state.disabled}/>
            )
        } else if (item.type === "select") {
            if (this.state.showStatus === 1) {
                return (
                    <Cascader
                    disabled={this.state.disabled}
                    fieldNames={fieldNames}
                    options={tree}
                    changeOnSelect
                    placeholder="请选择"/>)
            } else {
                return (
                    <Select>
                        {
                            this.state.orgIds.map(item => (
                                <Option value={item.id} key={item.id}>{item.name}</Option>
                            ))
                        }
                    </Select>
                )
            }
        } else {
            return (
                this.tier === 2 ?
                    <span>是</span> :
                    <Group disabled={this.state.disabled}>
                        <Radio value={1}>是</Radio>
                        <Radio value={0}>否</Radio>
                    </Group>
            )
        }
    }

    componentWillMount() {
        this.initColumns()
    }

    componentDidMount() {
        this.initDataSource()
        this.initOrg()
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {loading, dataSource, total, showStatus, show, addOrg} = this.state
        let title
        if (showStatus === 1) {
            title = "新建机构"
        } else if (showStatus === 2) {
            title = "编辑机构"
        } else {
            title = "查看机构"
        }
        return (
            <div className="org_container">
                <Row gutter={24}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={6} style={{marginBottom: '20px'}}>
                        <Card title="组织机构" bordered>
                            <EditTree listChildrenOrg={this.listChildrenOrg} initOrg={(fn) => {
                                this.fn = fn
                            }}/>
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={18}>
                        <Card title="系统设置 / 组织机构" bordered
                              extra={<Button type="primary" onClick={this.handelNewly}>新建</Button>}>
                            <Table
                                bordered
                                rowKey="id"
                                loading={loading}
                                dataSource={dataSource}
                                columns={this.columns}
                                pagination={total ? {
                                    total: total,
                                    showQuickJumper: true,
                                    showTotal: this.showTotal,
                                    onChange: this.changePage
                                } : false}
                            />
                            <Modal
                                destroyOnClose={true}
                                maskClosable={false}
                                title={title}
                                visible={show}
                                onOk={this.handelAdded}
                                onCancel={this.handleCancel}
                            >
                                <Form labelCol={{span: 5}} wrapperCol={{span: 19}}>
                                    {
                                        addOrg.map(item => (
                                            <Item label={item.label} key={item.label}>
                                                {getFieldDecorator(item.value, {
                                                    initialValue: item.initialValue,
                                                    rules: item.rules,
                                                })(
                                                    this.getItem(item)
                                                )}
                                            </Item>
                                        ))
                                    }
                                </Form>
                            </Modal>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Form.create()(Organization)