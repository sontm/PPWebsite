import React from 'react';
import Link from 'next/link'
import { withRouter } from 'next/router'
// Redux stuff
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { actUserLogin } from '../redux/UserReducer';

import { Form, Input, Button, notification } from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
const FormItem = Form.Item;


class Login extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        //event.preventDefault();   
        console.log("Handle Submit..")
        console.log(values)
        //this.props.history, this.props.location.state.from.pathname
        this.props.actUserLogin(values, this.props.router, "/")
    }

    render() {
        console.log("Login Page..............")
        console.log(this)
        return (
            <div style={{maxWidth: "420px", margin: "0 auto", marginTop: "40px"}}>
            <h1 className="page-title">Login</h1>
            <div className="login-content">
            <Form onFinish={this.handleSubmit} className="login-form">
                <Form.Item name="username"
                    rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                    ]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Username/Email/Phone" size="large"/>
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                    ]}
                    hasFeedback
                >
                    <Input.Password prefix={<LockOutlined />} placeholder="Password" size="large"/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" size="large" style={{width: "100%"}}>Login</Button>
                    Or <Link href="/signup">register now!</Link>
                </Form.Item>
            </Form>
            </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user
  });
  
const mapDispatchToProps = {
    actUserLogin
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
