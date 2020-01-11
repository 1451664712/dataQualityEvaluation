import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {Menu, Icon} from 'antd';
import './index.less'
import {menuList} from '../../utils/menuConfig'
import logo from '../../assets/image/pic_logo.png'
import logo2 from '../../assets/image/icon_logo_shanhu.png'

const {SubMenu} = Menu

class LeftNav extends Component {
    // 使用map + 递归调用
    getMenuNodes = (menuList) => {
        return menuList.map(item => {
            if (!item.children) {
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon}/>
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            } else {
                return (
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon}/>
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {
                            this.getMenuNodes(item.children)
                        }
                    </SubMenu>
                )
            }
        })
    }

    getLogoImg = () => {
        if (this.props.collapsed) {
            return (
                <img src={logo2} alt=""/>
            )
        } else {
            return (
                <img src={logo} alt=""/>
            )
        }
    }

    componentWillMount() {
        this.menuNodes = this.getMenuNodes(menuList)
    }

    render() {
        console.log(this.props);
        const path = this.props.location.pathname;
        console.log(path);
        return (
            <div>
                <Link to="/index" className="logo">
                    {
                        this.getLogoImg()
                    }
                </Link>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={[path]}>
                    {
                        this.menuNodes
                    }
                </Menu>
            </div>
        )
    }
}

export default withRouter(LeftNav)
