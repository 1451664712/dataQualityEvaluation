import React, {Component} from 'react'
import './index.less'
import {Tree, Icon, Modal, Input, Form, Select, Radio, Cascader, message} from 'antd'
import {reqAddOrganization, reqTreeOrg} from "../../../api/organization"

const {TreeNode} = Tree;
const {Search} = Input;
const {Item} = Form
const {Group} = Radio

class EditTree extends Component {

    state = {
        showStatus: 0,
        expandedKeys: [],
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
        orgList: []
    }

    // 组织机构树
    getTreeNodes = (data) => data.map(item => {
        const title = (
            <div className="add">
                <span className="org_value">{item.name}</span>
                {
                    item.level == 0 ?
                        (<Icon
                            type='plus'
                            // style={{color: '#1570C4'}}
                            onClick={this.addForm.bind(this, item)}
                        />) :
                        null
                }
            </div>
        )
        if (item.children && item.children.length > 0) {
            return (
                <TreeNode title={title} key={item.id} icon={<Icon type="carry-out"/>}>
                    {this.getTreeNodes(item.children)}
                </TreeNode>
            )
        } else {
            return (
                <TreeNode title={title} key={item.id} icon={<Icon type="carry-out"/>}/>
            )
        }
    })

    // 新建
    addForm = (data, e) => {
        console.log(data);
        e.stopPropagation();
        this.tier = data.tier
        let tree = this.state.orgList
        let arr = this.getOrgList(tree, data.id).reverse()
        this.state.addOrg[2].initialValue = arr
        this.setState({showStatus: 1})
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

    // 新建确定
    addOrg = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const {code, contact, email, level, name, telephone} = values
                let pid = values.pid && values.pid.length > 0 ? values.pid[values.pid.length - 1] : ""
                let id = 0
                reqAddOrganization(
                    {code, contact, email, level, name, telephone, pid, id}
                ).then(res => {
                    if (res.code == '200') {
                        message.success("操作成功")
                        this.initOrg()
                    }
                })
            }
        });
    }

    // 取消
    handleCancel = () => {
        this.setState({showStatus: 0})
    }

    // 点击树节点
    onSelect = async (selectedKeys) => {
        this.props.listChildrenOrg(...selectedKeys)
    }

    onCheck = (selectedKeys, info) => {
        console.log(selectedKeys, info);
    }

    getItem = (item) => {
        const fieldNames = {
            label: 'name',
            value: 'id',
            children: 'children'
        }
        let tree = this.state.orgList
        if (item.type === "input") {
            return (
                <Input placeholder={'请输入' + item.label}/>
            )
        } else if (item.type === "select") {
            return (
                <Cascader
                    disabled={item.disabled}
                    fieldNames={fieldNames}
                    options={tree}
                    changeOnSelect
                    placeholder="请选择"/>
            )
        } else {
            return (
                this.tier === 2 ?
                    <span>是</span> :
                    <Group>
                        <Radio value={1}>是</Radio>
                        <Radio value={0}>否</Radio>
                    </Group>
            )
        }
    }

    // 组织结构
    initOrg = () => {
        reqTreeOrg().then(res => {
            if (res.code == '200') {
                this.setState({
                    orgList: res.result,
                    showStatus: 0
                })
            }
        })
    }

    componentDidMount() {
        this.initOrg()
        this.props.initOrg(this.initOrg)
    }

    render() {
        const {showStatus, addOrg, orgList} = this.state
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                <Search style={{marginBottom: 8}} placeholder="Search" onChange={this.onChange}/>
                <Tree
                    showLine={true}
                    onSelect={this.onSelect}
                    onCheck={this.onCheck}
                >
                    {
                        this.getTreeNodes(orgList)
                    }
                </Tree>
                <Modal
                    destroyOnClose={true}
                    maskClosable={false}
                    title="新建机构"
                    visible={showStatus === 1}
                    onOk={this.addOrg}
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
            </div>
        )
    }
}

const WrappedNormalTree = Form.create({name: 'normal_login'})(EditTree);
export default WrappedNormalTree