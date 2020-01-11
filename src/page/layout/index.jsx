import React, {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import './index.less'
import {Layout, Icon, Modal, message, Avatar} from 'antd';
import storageUtils from '../../utils/store'
import {getToken, removeToken} from "../../utils/cookie";
import LeftNav from "../../components/leftNav";
import Home from "../home/index";
import DataSource from "../dataSource"
import UserInfo from '../system/account'
import Role from '../system/role'
import {reqLogout} from "../../api";
import {connect} from 'react-redux'

const {Header, Sider, Content} = Layout;
const {confirm} = Modal

class Index extends Component {
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    logout = () => {
        confirm({
            content: '确定退出吗？',
            okText: '确认',
            cancelText: '取消',
            onOk: async () => {
                const result = await reqLogout()
                if (result.code == '200') {
                    storageUtils.removeUser()
                    removeToken()
                    message.success('系统已退出！')
                    this.props.history.replace('/login')

                }
            }
        })
    }

    render() {
        let user = storageUtils.getUser()
        if (!user || !user.id || !getToken()) {
            return <Redirect to="/login"/>
        }
        const {name, imgUrl} = this.props.user
        return (
            <Layout className="layout_index">
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <LeftNav collapsed={this.state.collapsed}/>
                </Sider>
                <Layout>
                    <Header style={{background: '#fff', padding: '0 20px'}}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                        <div className="userInfo">
                            <Avatar size="large" src={imgUrl}/>
                            <span>欢迎！ {name}</span>
                            <Icon type="poweroff" onClick={this.logout}/>
                        </div>
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px',
                            background: 'none',
                            minHeight: 280,
                        }}
                    >
                        <Switch>
                            <Route path='/home' component={Home}/>
                            <Route path='/dataSource' component={DataSource}/>
                            <Route path='/dataSource' component={DataSource}/>
                            <Route path='/system/userInfo' component={UserInfo}/>
                            <Route path='/system/role' component={Role}/>
                            <Redirect to="/home"/>
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default connect(
    state => ({
        user: state.user
    })
)(Index)