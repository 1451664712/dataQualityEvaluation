import React, {Component} from 'react'
import './index.less'
import {Row, Col, Card, Icon} from 'antd'
import {
    reqMatchedRules,
    reqRuleRegular,
    reqSourceType,
    reqTaskCountByMatchedRules,
    reqEvaluateResult
} from '../../api'
import Bar from './bar'

class Home extends Component {
    state = {
        dataText: '',
        dataBase: '',
        matchedRules: '',
        ruleRegular: '',
        execute: '',
        unexecute: '',
        sourceData: []
    }
    /**
     * 获取文本数据源与数据库数据源
     */
    getSourceType = () => {
        reqSourceType().then(res => {
            if (res.code == '200') {
                this.setState({
                    dataBase: res.result.datasource,
                    dataText: res.result.text,
                })
            }
        })
    }

    /**
     * 获取规则模板数量
     */
    getMatchedRules = () => {
        reqMatchedRules().then(res => {
            if (res.code == '200') {
                this.setState({
                    matchedRules: res.result.datasource,
                })
            }
        })
    }

    /**
     * 获取自定义数量
     */
    getRuleRegular = () => {
        reqRuleRegular().then(res => {
            if (res.code == '200') {
                this.setState({
                    ruleRegular: res.result.datasource,
                })
            }
        })
    }
    /**
     * 获取任务待执行，未执行
     */
    getTaskCountByMatchedRules = () => {
        reqTaskCountByMatchedRules().then(res => {
            if (res.code == '200') {
                this.setState({
                    execute: res.result.execute,
                    unexecute: res.result.unexecute,
                })
            }
        })
    }

    /**
     *  最近10此评价得分情况
     */
    getEvaluateResult = () => {
        reqEvaluateResult().then(res => {
            if (res.code == '200') {
                this.setState({
                    sourceData: res.result
                })
            }
        })
    }

    componentDidMount() {
        this.getSourceType()
        this.getMatchedRules()
        this.getRuleRegular()
        this.getTaskCountByMatchedRules()
        this.getEvaluateResult()
    }


    render() {
        const {dataBase, dataText, matchedRules, ruleRegular, execute, unexecute, sourceData} = this.state
        return (
            <div className="home">
                <Row gutter={24}>
                    <Col xs={24} sm={12} md={12} lg={8} xl={4}>
                        <Card title="文本数据源" extra={<Icon type="file-text"/>}>
                            <span>{dataText}</span>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={8} xl={4}>
                        <Card title="数据库数据源" extra={<Icon type="database"/>}>
                            <span>{dataBase}</span>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={8} xl={4}>
                        <Card title="规则模版数" extra={<Icon type="number"/>}>
                            <span>{matchedRules}</span>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={8} xl={4}>
                        <Card title="自定义规则数" extra={<Icon type="edit"/>}>
                            <span>{ruleRegular}</span>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={8} xl={4}>
                        <Card title="待执行" extra={<Icon type="exclamation-circle"/>}>
                            <span>{execute}</span>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={12} lg={8} xl={4}>
                        <Card title="执行中" extra={<Icon type="loading"/>}>
                            <span>{unexecute}</span>
                        </Card>
                    </Col>
                </Row>
                <Card title="最近10次数据质量评价得分情况">
                    <Bar data={sourceData}/>
                </Card>
            </div>
        )
    }
}

export default Home
