import React, {Component} from 'react'
import {Tree, Form, Radio} from 'antd'

import {reqMenuList} from "../../../api/role";

const {TreeNode} = Tree
const {Item} = Form
const {Group} = Radio
export default class TreeNodes extends Component {
    constructor(props) {
        super(props)
        const {permission} = this.props.roles.data
        const {menus} = this.props.roles
        this.state = {
            resourceId: menus,
            permission: permission,
        }
    }

    // 获取菜单数据
    initMenuList = () => {
        reqMenuList().then(res => {
            if (res.code == '200') {
                this.menuNodes = res.result
                this.treeNodes = this.getTreeNodes(this.menuNodes)
            }
        })
    }
    // 处理菜单数据
    getTreeNodes = (data) => {
        // return data.reduce((pre, item) => {
        //     pre.push(
        //         <TreeNode title={item.name} key={item.id}>
        //             {item.children.length > 0 ? this.getTreeNodes(item.children) : null}
        //         </TreeNode>
        //     )
        //     return pre
        // }, [])
        return data.map(item => {

            if (item.children.length > 0) {
                if (item.name == '系统设置') {
                    item.children.map(c => {
                        if (c.name == '个人信息') {
                            c.disabled = true
                        }
                    })
                }
                return (
                    <TreeNode title={item.name} key={item.id} disabled={item.disabled}>
                        {
                            this.getTreeNodes(item.children)
                        }
                    </TreeNode>
                )
            } else {
                if (item.name == '首页') {
                    item.disabled = true
                }
                return (
                    <TreeNode title={item.name} key={item.id} disabled={item.disabled}></TreeNode>
                )
            }
        })
    }

    // 选中复选框
    onCheck = (resourceId) => {
        this.setState({resourceId});
    }

    // 单选按钮
    onChange = e => {
        this.setState({
            permission: e.target.value,
        });
    };


    componentWillMount() {
        let menuNodes = localStorage.getItem('menuNodes')
        if (menuNodes) {
            this.treeNodes = this.getTreeNodes(JSON.parse(menuNodes))
        }
    }

    componentDidMount() {
        this.initMenuList()
    }

    render() {
        const {name, id} = this.props.roles.data
        const {resourceId, permission} = this.state
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 4},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 20},
            },
        };
        this.props.setForm({id, resourceId, permission})
        console.log(resourceId);

        return (
            <Form {...formItemLayout}>
                <Item label="授权角色">
                    <span>{name}</span>
                </Item>
                <Item label="数据权限">
                    <Group onChange={this.onChange} value={permission}>
                        <Radio value={1}>所在机构下所有操作数据</Radio>
                        <Radio value={0}>所在账号下所有操作数据</Radio>
                    </Group>
                </Item>
                <Item label="权限功能">
                    <Tree
                        checkedKeys={resourceId.length > 0 ? resourceId : ['10', '12']}
                        defaultExpandAll={true}
                        onCheck={this.onCheck}
                        checkable
                    >
                        {
                            this.treeNodes
                        }
                    </Tree>
                </Item>
            </Form>
        )
    }
}
