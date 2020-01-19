import React, {Component} from 'react'
import './index.less'
import {Row, Col, Card, Button, Table} from 'antd'
import EditTree from "./editTree"
import {
    reqListOrganization,
    reqListChildrenOrganizationById
} from "../../../api/organization";
import {PAGE_SIZE} from "../../../utils/config";

export default class Organization extends Component {

    state = {
        loading: false,
        dataSource: [],
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
                            onClick={
                                () => {
                                    this.editHandleSubmit(record)
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

    // 翻页
    changePage = (curPage) => {
        this.state.curPage = curPage
        this.initDataSource()
    }

    // 显示总数
    showTotal = (total, range) => {
        return `${range[0]}-${range[1]} 共 ${total}`
    }

    componentWillMount() {
        this.initColumns()
    }

    componentDidMount() {
        this.initDataSource()
    }

    render() {
        const {loading, dataSource, total} = this.state
        return (
            <div className="org_container">
                <Row gutter={24}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={6} style={{marginBottom: '20px'}}>
                        <Card title="组织机构" bordered>
                            <EditTree listChildrenOrg={this.listChildrenOrg} initOrg={this.initOrg} tree={this.tree}/>
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={18}>
                        <Card title="系统设置 / 组织机构" bordered extra={<Button type="primary">新建</Button>}>
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
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}