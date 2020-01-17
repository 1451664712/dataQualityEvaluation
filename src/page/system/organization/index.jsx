import React, {Component} from 'react'
import './index.less'
import {Row, Col, Card, Button, Table} from 'antd'
import EditTree from "./editTree"
import {reqTreeOrg} from "../../../api/organization";
// import EditableTree from "./editableTree"

export default class Organization extends Component {


    // 组织结构
    initOrg = () => {
        reqTreeOrg().then(res => {
            if (res.code == '200') {
                localStorage.setItem("tree", JSON.stringify(res.result))
            }
        })
    }

    componentDidMount() {
        this.initOrg()
    }

    render() {
        return (
            <div className="org_container">
                <Row gutter={24}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={6} style={{marginBottom: '20px'}}>
                        <Card title="组织机构" bordered>
                            <EditTree />
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={18}>
                        <Card title="系统设置 / 组织机构" bordered extra={<Button type="primary">新建</Button>}>
                            {/*<Table></Table>*/}
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}