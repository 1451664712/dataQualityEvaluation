import React, {Component} from 'react'
import './index.less'
import {Tree, Icon, Modal} from 'antd'
import {reqListChildrenOrg} from "../../../api/organization"
import Trees from "../role";

const {TreeNode} = Tree;

class EditTree extends Component {

    state = {
        showStatus: 0
    }

    // 组织机构树
    getTreeNodes = (data) => data.map(item => {
        const title = (
            <div>
                <span className="org_value">{item.name}</span>
                {
                    item.level == 0 ?
                        (<Icon
                            type="file-add"
                            style={{color: '#1570C4'}}
                            onClick={this.addForm}
                        />) :
                        null
                }
            </div>
        )
        if (item.children && item.children.length > 0) {
            return (
                <TreeNode title={title} key={item.id}>
                    {this.getTreeNodes(item.children)}
                </TreeNode>
            )
        } else {
            return (
                <TreeNode title={title} key={item.id}/>
            )
        }
    })

    // 新建
    addForm = (e) => {
        e.stopPropagation();
        console.log(1);
        this.setState({showStatus: 1})
    }

    // 新建确定
    addOrg = () => {
        console.log(1);
    }

    // 取消
    handleCancel = () => {
        this.setState({showStatus: 0})
    }
    // 点击树节点
    onSelect = async (selectedKeys) => {
        const result = await reqListChildrenOrg(selectedKeys[0])
        console.log(result);
    }
    onCheck = (selectedKeys, info) => {
        console.log(selectedKeys, info);
    }

    // 点击复选框

    componentWillMount() {
        let tree = localStorage.tree
        if (tree !== undefined) {
            console.log(JSON.parse(tree));
            this.treeNodes = this.getTreeNodes(JSON.parse(tree))
        }
    }

    render() {
        const {showStatus} = this.state
        return (
            <div>
                <Tree

                    onSelect={this.onSelect}
                    onCheck={this.onCheck}
                >
                    {
                        this.treeNodes
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
                </Modal>
            </div>
        )
    }
}

export default EditTree