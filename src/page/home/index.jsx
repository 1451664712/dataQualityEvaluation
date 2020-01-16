import React, {Component} from 'react'
import './index.less'
import {Row, Col, Card, Timeline} from 'antd'
import {
    reqMatchedRules,
    reqRuleRegular,
    reqSourceType,
    reqTaskCountByMatchedRules,
    reqEvaluateResult,
    reqListTemplates

} from '../../api'
import Bar from './bar'

import textData from './image/icon_txt_data.png'
import baseData from './image/icon_database_data.png'
import guiZe from './image/icon_guizebmoban.png'
import ziDingy from './image/icon_zidingyiguize.png'
import nodeData from "./image/pic_opps_nodata.png";

class Home extends Component {
    state = {
        dataText: '',
        dataBase: '',
        matchedRules: '',
        ruleRegular: '',
        execute: '',
        unexecute: '',
        sourceData: [],
        dataSituation: [
            {
                title: "文本数据源",
                icon: textData,
                total: 8,
                background: '#15C4C1'
            },
            {
                title: "数据库数据源",
                icon: baseData,
                total: 8,
                background: '#31B5F7'
            },
            {
                title: "规则模版数",
                icon: guiZe,
                total: 8,
                background: '#FF9A00'
            },
            {
                title: "自定义规则数",
                icon: ziDingy,
                total: 8,
                background: '#FFCC00'
            }
        ],
        dataSource: []
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
        const data = {
            permission: 0,
            taskStatus: 1,
            total: 0,
            limit: 10,
            curPage: 1
        }
        reqListTemplates(data).then(res => {
            if (res.code == '200') {
                console.log(res);
                this.setState({dataSource: res.result.records})
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
        const {sourceData, dataSituation, dataSource} = this.state
        return (
            <div className="home">
                <Row gutter={24}>
                    {
                        dataSituation.map(item => {
                            return (
                                <Col xs={24} sm={12} md={12} lg={12} xl={6} key={item.title}>
                                    <div className="home_container">
                                        <div className="home_title" style={{backgroundColor: item.background}}>
                                            <img src={item.icon} alt=""/>
                                        </div>
                                        <div className="home_content">
                                            <span>+ 100</span>
                                            <p>{item.title}</p>
                                        </div>
                                    </div>
                                </Col>
                            )
                        })
                    }
                </Row>
                <Row gutter={24}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={18}>
                        <Card title="最近10次数据质量评价得分情况" bordered>
                            <Bar data={sourceData}/>
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={6}>
                        <Card title="待执行任务" bordered>
                            <div className="task">
                                {
                                    dataSource.length > 0 ?
                                        this.state.dataSource.map(item => {
                                            return (
                                                <Timeline key={item.id}>
                                                    <Timeline.Item>
                                                        <span>{item.createTime}</span>
                                                        <div className="task_content">
                                                            <h4>{item.taskName}</h4>
                                                            <p>评测时间于 {item.executeTime} 开始</p>
                                                        </div>
                                                    </Timeline.Item>
                                                </Timeline>
                                            )
                                        })
                                        : (
                                            <div className="none_data">
                                                <img src={nodeData} alt=""/>
                                                <p>暂无数据</p>
                                            </div>
                                        )
                                }
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Home
