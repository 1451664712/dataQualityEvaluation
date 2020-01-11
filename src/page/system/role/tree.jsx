import React, {Component} from 'react'
import {Tree} from 'antd'

import {reqMenuList} from "../../../api/role";

const {TreeNode} = Tree
export default class TreeNodes extends Component {
    state = {
        checkedKeys: []
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
    onCheck = (checkedKeys ) => {
        console.log(checkedKeys);
    }
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
        return (
            <Tree
                defaultExpandAll={true}
                defaultCheckedKeys={['10', '12']}
                onCheck={this.onCheck}
                checkable
            >
                {
                    this.treeNodes
                }
            </Tree>
        )
    }
}
