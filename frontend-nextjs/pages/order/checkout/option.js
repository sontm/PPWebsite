import React, { Component } from 'react'
import Link from 'next/link'
import { Form, Row, Col,Slider, InputNumber, Input, Button, Card, Descriptions } from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Head from 'next/head'
import MyLayout from '../../../components/layout';

import { Typography, Space } from 'antd';
const { Title, Text } = Typography;

class CheckoutOption extends Component {
    constructor(props) {
        super(props)

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
        console.log("$$$$$$$$$$$$$$$$$$$ CHeckout User Option")
        
        return (
            <MyLayout>
                <Head>
                    <title>Option</title>
                </Head>
                <Row>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                    <Card title="Dang Nhap De Mua Hang TODO" style={{marginRight: "5px"}}>
                        <div style={{maxWidth: "420px", margin: "0 auto"}}>
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
                    </Card>
                </Col>

                <Col xs={24} sm={24} md={2} lg={2} xl={2} xxl={2}>
                    <div style={{marginLeft: "5px", marginRight: "5px", minHeight: "120px", 
                            display: "flex",justifyContent: "center", alignItems: "center"}}>
                        <Title level={5}>Hoac</Title>
                    </div>
                    
                </Col>

                <Col xs={24} sm={24} md={10} lg={10} xl={10} xxl={10}>
                    <Card title="Mua Hang Chi Mat 10s">
                        <Link href="/order/checkout">
                        <div style={{display: "flex",justifyContent: "center"}}>
                        <Button type="primary" size="large"
                            style={{width: "300px", height:"50px", fontSize:"1.5em"}}>Mua Khong Can Dang NHap</Button>
                        </div>
                        </Link>
                        
                    </Card>
                </Col>
                </Row>
                
            </MyLayout>
        );
    }
}

const mapStateToProps = (state) => (state);
const mapDispatchToProps = (dispatch) => {
    return {
        //actUserGetProductsInCart: bindActionCreators(actUserGetProductsInCart, dispatch),
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutOption)

