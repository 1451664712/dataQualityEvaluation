import React, {Component} from 'react'
import {Tabs, Form, Icon, Select, Input, Upload, Button, message} from 'antd'
import {URL} from "../../utils/config";
import {getToken} from "../../utils/cookie";

const {Item} = Form
const {Option} = Select
const {TextArea} = Input;

const {TabPane} = Tabs;

class AddForm extends Component {
    state = {
        source: '',
        dictionaries: ''
    }

    componentWillMount() {
        this.props.setForm(this.props.form)
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const source = {
            name: 'file',
            action: URL,
            headers: {
                authorization: getToken(),
            },
            onChange: ({file, fileList}) => {
                if (file.status === 'done') {
                    message.success('上传成功')
                    const source = file.response.src
                    this.setState({source})
                    this.props.getFileSrc(source)
                }
                if (file.status === 'removed') {
                    const source = null
                    this.setState({source})
                    this.props.getFileSrc(source)
                }
            },
        };
        const dictionaries = {
            name: 'file',
            action: URL,
            headers: {
                authorization: getToken(),
            },
            onChange: ({file,}) => {
                if (file.status === 'done') {
                    message.success('上传成功')
                    const dictionaries = file.response.src
                    this.setState({dictionaries})
                    this.props.getSourceDict(dictionaries)
                }
                if (file.status === 'removed') {
                    const dictionaries = null
                    this.setState({dictionaries})
                    this.props.getSourceDict(dictionaries)
                }
            },
        };
        // sourceDict

        return (
            <Tabs onChange={this.callback} type="card">
                <TabPane tab="文本数据源" key="0">
                    <Form labelCol={{span: 4}} wrapperCol={{span: 16}}>
                        <Item label="数据源类型">
                            {getFieldDecorator('sourceType ', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请先选择数据源类型',
                                    },
                                ],
                            })(
                                <Select
                                    placeholder="请先选择数据源类型"
                                >
                                    <Option value="excel">EXCEL</Option>
                                    <Option value="csv">CSV</Option>
                                </Select>
                            )}
                        </Item>
                        <Item label="数据源名称">
                            {getFieldDecorator('sourceName ', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请先输入数据源名称',
                                    },
                                ],
                            })(<Input placeholder="请输入数据源名称"/>)}
                        </Item>
                        <Item label="添加数据源">
                            <Upload {...source} accept=".xls,.xlsx,.csv">
                                <Button>
                                    <Icon type="upload"/> 点击上传
                                </Button>
                            </Upload>
                        </Item>
                        <Item label="数据字典">
                            <Upload {...dictionaries} accept=".xls,.xlsx,.csv">
                                <Button>
                                    <Icon type="upload"/> 点击上传
                                </Button>
                            </Upload>
                        </Item>
                        <Item label="数据源描述">
                            {getFieldDecorator('sourceDiscribe  ', {
                                rules: [
                                    {
                                        required: true,
                                        message: '数据源描述不能为空',
                                    },
                                ],
                            })(
                                <TextArea placeholder="请输入数据源描述"/>
                            )}
                        </Item>
                    </Form>
                </TabPane>
                <TabPane tab="数据库数据源" key="1">
                    <Form labelCol={{span: 4}} wrapperCol={{span: 16}}>
                        <Item label="数据库类型">
                            {getFieldDecorator('sourceType ', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请先选择数据库类型',
                                    },
                                ],
                            })(
                                <Select
                                    placeholder="请先选择数据库类型"
                                >
                                    <Option value="MySql">MySql</Option>
                                    <Option value="Oracle">Oracle</Option>
                                </Select>
                            )}
                        </Item>
                        <Item label="数据源名称">
                            {getFieldDecorator('sourceName ', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请先输入数据源名称',
                                    },
                                ],
                            })(<Input placeholder="请输入数据源名称"/>)}
                        </Item>
                        <Item label="数据库名称">
                            {getFieldDecorator('databaseName ', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请先输入数据库名称',
                                    },
                                ],
                            })(<Input placeholder="请输入数据库名称"/>)}
                        </Item>
                        <Item label="IP地址">
                            {getFieldDecorator('sourceIp', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请先输IP地址',
                                    },
                                ],
                            })(<Input placeholder="请输入IP地址"/>)}
                        </Item>
                        <Item label="端口号">
                            {getFieldDecorator('sourcePort', {
                                rules: [
                                    {
                                        required: true,
                                        message: '端口号不能为空',
                                    },
                                ],
                            })(<Input placeholder="请输入端口号"/>)}
                        </Item>
                        <Item label="用户名">
                            {getFieldDecorator('databaseUsername', {})(<Input placeholder="请输入端口号"/>)}
                        </Item>
                        <Item label="密码">
                            {getFieldDecorator('databasePassword', {})(<Input placeholder="请输入密码" type="password"/>)}
                        </Item>
                        <Item label="数据源描述">
                            {getFieldDecorator('sourceDiscribe  ', {
                                rules: [
                                    {
                                        required: true,
                                        message: '数据源描述不能为空',
                                    },
                                ],
                            })(
                                <TextArea placeholder="请输入数据源描述"/>
                            )}
                        </Item>
                    </Form>
                </TabPane>
            </Tabs>
        )
    }
}

export default Form.create()(AddForm)
