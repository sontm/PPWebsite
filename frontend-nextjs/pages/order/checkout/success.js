import React, { Component } from 'react'
import Link from 'next/link'
import { Empty, Row, Col,Alert, InputNumber, Input, Button, Card, Descriptions } from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Head from 'next/head'
import MyLayout from '../../../components/layout';
import { withRouter } from "next/router";

import { Typography, Space } from 'antd';
const { Title, Text } = Typography;

class SuccessOrder extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log("$$$$$$$$$$$$$$$$$$$ CHeckout Success")
        console.log(this.props.router.query)
        let viewData = [];
        if (this.props.router.query && this.props.router.query.OrderNumber && this.props.router.query.OrderNumber.length > 5) {
            viewData = (
                <Card>
                    <Space direction="vertical">
                        <Title level={4}>Cam ON Ban Da Mua Hang!</Title>
                        <Text>Ma So Don Hang Cua Ban:</Text>
                        <Button type="primary" size="large" style={{width: "300px"}}>{this.props.router.query.OrderNumber}</Button>
                        <Text>{"Ma So Don Hang Cua Ban: "}
                            <Link href={`/order/tracking?OrderNumber=${this.props.router.query.OrderNumber}`}>
                                <a>{"tracking"}
                                </a>
                            </Link>
                        </Text>
                        <Alert
                            message="Chu Y"
                            description="Chung toi se goi dien den so dien thoai XXXX de xac nhan don hang."
                            type="success"
                            showIcon
                        />
                    </Space>
                </Card>
            )
        } else {
            viewData= (
                <Empty
                    description={
                    <span>
                        Not Found Order Number!
                    </span>
                    }
                ></Empty>
            )
        }
        return (
            <MyLayout>
                <Head>
                    <title>Success</title>
                </Head>
                <Row>
                <Col xs={0} sm={0} md={2} lg={4} xl={4} xxl={4}>
                    
                </Col>

                <Col xs={24} sm={24} md={20} lg={16} xl={16} xxl={16}>
                    {viewData}
                </Col>

                <Col xs={0} sm={0} md={2} lg={4} xl={4} xxl={4}>

                </Col>
                </Row>
            </MyLayout>
        );
    }
}

export default withRouter(SuccessOrder)

