import React, {Component} from 'react'
import {Tabs} from 'antd';
import './index.less'
import BasicInfo from './basicInfo'
import SafeSetup from './safeSetup'
const {TabPane} = Tabs;
export default class UserInfo extends Component {
    state = {
        tabPosition: 'left'
    }

    render() {
        return (
            <div className="account_content">
                <Tabs tabPosition={this.state.tabPosition} size="large">
                    <TabPane tab="基本设置" key="1">
                        <div className="account_right">
                            <BasicInfo />
                        </div>
                    </TabPane>
                    <TabPane tab="安全设置" key="2">
                        <div className="account_right">
                            <SafeSetup />
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}
