import React, {Component} from 'react'
import {Button, Card, Table, Modal, message} from 'antd'
import './index.less'
import {reqDataSource} from "../../api";
import {reqAddAndEdit} from "../../api/mySource";
import AddForm from './addForm'

class DataSource extends Component {
    state = {
        loading: false,
        dataSource: [],
        showStatus: 0
    }

    constructor(props) {
        super(props)
        this.add = React.createRef()
    }

    showAddData = () => {
        this.setState({showStatus: 1})
    }

    // 初始化表
    initData = () => {
        this.setState({loading: true})
        reqDataSource().then(res => {
            if (res.code == '200') {
                let dataSource = res.result.records
                this.setState({dataSource})
                this.setState({loading: false})
            }
        })
    }

    // 添加按钮
    addUserAndUpdateUser = () => {
        this.form.validateFields(async (err) => {
            if (!err) {
                const user = this.form.getFieldsValue()
                const src = this.fileSrc
                if (!src) {
                    message.error('请先添加数据源')
                    return
                }
                const sourceDict = this.sourceDict
                // this.form.resetFields();
                const data = {...user, src, sourceDict}
                reqAddAndEdit({...user, src, sourceDict}).then(res => {
                    console.log(res);
                })
            }
        })
    }

    // 取消按钮
    handleCancel = () => {
        this.setState({showStatus: 0})
        this.form.resetFields();
    }

    initColumns = () => {
        this.columns = [
            {
                title: '数据源名称',
                dataIndex: 'sourceName',
                ellipsis: true,

            },
            {
                title: '数据源类型',
                dataIndex: 'sourceType',
                ellipsis: true,
            },
            {
                title: '数据源描述',
                dataIndex: 'sourceDiscribe',
                ellipsis: true,
            },
            {
                title: '上传时间',
                dataIndex: 'time',
                ellipsis: true,
            },
            {
                title: "操作",
                width: 300,
                render: () => (
                    <span>
                      <Button type="link" style={{padding: '0', marginRight: '10px'}}>编辑</Button>
                      <Button type="link" style={{padding: '0', marginRight: '10px'}} onClick={this.handleDelete}>删除</Button>
                    </span>
                )
            }
        ];
    }

    componentWillMount() {
        this.initColumns()
    }

    componentDidMount() {
        this.initData()
    }

    render() {
        const extra = (
            <Button type="primary" onClick={this.showAddData}>新建数据源</Button>
        )
        const title = '我的数据源'
        const {dataSource, loading, showStatus} = this.state
        return (
            <div className="data_source">
                <Card title={title} extra={extra} bordered={false}>
                    <Table
                        bordered
                        rowKey="id"
                        loading={loading}
                        dataSource={dataSource}
                        columns={this.columns}
                    />
                    <Modal
                        width="40%"
                        title="添加数据源"
                        visible={showStatus === 1}
                        onOk={this.addUserAndUpdateUser}
                        onCancel={this.handleCancel}
                    >
                        <AddForm
                            setForm={(form) => {
                                this.form = form
                            }}
                            getFileSrc={(fileSrc) => {
                                this.fileSrc = fileSrc
                            }}
                            getSourceDict={(sourceDict) => {
                                this.sourceDict = sourceDict
                            }}
                        />
                    </Modal>
                </Card>
            </div>
        )
    }
}

export default DataSource
