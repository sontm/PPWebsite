import React, { Component } from 'react'
import Link from 'next/link'
import { Form, Row, Col,List, Empty, Input, Button, Card, Descriptions } from 'antd';
import {UserOutlined, SearchOutlined} from '@ant-design/icons';
import { Typography, Space } from 'antd';
import { withRouter } from "next/router";

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Head from 'next/head'
import MyLayout from '../../components/layout';
import {STORAGE_CART_PROD} from '../../util/AppConstant'
import styles from './tracking.module.css'
import helpers from '../../util/Helpers'
import backend from '../../util/Backend';

const { Text, Title } = Typography;

class OrderView extends Component {
    constructor(props) {
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this);
        this.searchOrderNumber = this.searchOrderNumber.bind(this);

        this.state = {
            order: null,
            orderItems: []
        }

        this.formRef = React.createRef();
    }
    handleSubmit(values) {
        //event.preventDefault();   
        console.log("Handle Submit..")
        console.log(values)
        this.isLoadedOrderQuery = false;
        this.props.router.replace(`/order/tracking?OrderNumber=${values.ordernumber}`)

        // backend.getUserOrderByOrderNumber(
        //     values.ordernumber,
        //     response => {
        //         console.log("getUserOrderByOrderNumber Done&&&&&&&&&&&&&&&&&&&&&&&&6")
        //         console.log(response.data)

        //         // console.log(orderItems)
        //         if (response.data && response.data.length && response.data[0].id) {
        //             backend.getUserOrderItemByOrderNumber(values.ordernumber,
        //             response2 => {
        //                 console.log("getUserOrderItemByOrderNumber Done&&&&&&&&&&&&&&&&&&&&&&&&6")
        //                 console.log(response2.data)

        //                 this.setState({
        //                     order: response.data[0],
        //                     orderItems: response2.data
        //                 })
        //             },
        //             error2 => {
        //                 console.log("getUserOrderItemByOrderNumber error")
        //                 console.log(error2)
        //             }); 
        //         }
        //     },
        //     error => {
        //         console.log("getUserOrderByOrderNumber error")
        //         console.log(error)
        //     }); 
    }

    componentDidMount() {
        console.log("$$$$$$$$$$$$$$$$$$$ OrderView componentDidMount")
        console.log(this.props.router.query)
        if (!this.isLoadedOrderQuery && this.props.router.query && 
            this.props.router.query.OrderNumber && this.props.router.query.OrderNumber.length > 5) {
            this.isLoadedOrderQuery = true;

            this.formRef.current.setFieldsValue({ordernumber:this.props.router.query.OrderNumber});

            this.searchOrderNumber(this.props.router.query.OrderNumber);
            
        }
    }
    componentDidUpdate() {
        console.log("$$$$$$$$$$$$$$$$$$$ OrderView componentDidUpdate:" + this.isLoadedOrderQuery)
        console.log(this.props.router.query)
        if (!this.isLoadedOrderQuery && this.props.router.query && this.props.router.query.OrderNumber.length > 5) {
            this.isLoadedOrderQuery = true;

            this.formRef.current.setFieldsValue({ordernumber:this.props.router.query.OrderNumber});

            this.searchOrderNumber(this.props.router.query.OrderNumber);
            
        }
    }

    searchOrderNumber(orderNumber) {
        backend.getUserOrderByOrderNumber(
            orderNumber,
            response => {
                console.log("getUserOrderByOrderNumber Done&&&&&&&&&&&&&&&&&&&&&&&&6")
                console.log(response.data)

                // console.log(orderItems)
                if (response.data && response.data.length && response.data[0].id) {
                    backend.getUserOrderItemByOrderNumber(orderNumber,
                    response2 => {
                        console.log("getUserOrderItemByOrderNumber Done&&&&&&&&&&&&&&&&&&&&&&&&6")
                        console.log(response2.data)

                        this.setState({
                            order: response.data[0],
                            orderItems: response2.data
                        })
                    },
                    error2 => {
                        console.log("getUserOrderItemByOrderNumber error")
                        console.log(error2)
                    }); 
                } else {
                    // No Data
                    this.setState({
                        order: null,
                        orderItems: []
                    })
                }
            },
            error => {
                console.log("getUserOrderByOrderNumber error")
                console.log(error)
            }); 
    }

    render() {
        console.log("$$$$$$$$$$$$$$$$$$$ OrderView Render")
        console.log(this.props.router.query)
        let viewResult = (
            <Empty
                description={
                <span>
                    Not Found Order Number!
                </span>
                }
            ></Empty>
        );
        if (this.state.order && this.state.orderItems.length) {
            viewResult = (
            <Row style={{marginTop: "20px"}}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Card title={"Don Hang:" + this.state.order.OrderNumber +" (Trang Thai:" + this.state.order.Status+")"}
                        extra={
                        <Text>Ngày đặt hàng: {this.state.order.DatePlaced}</Text>
                        }>

                    <Row type="flex">
                        <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
                            <Card title="ĐỊA CHỈ NGƯỜI NHẬN">
                                <Space direction="vertical">
                                    <Title level={5}>{this.state.order.CustomerName}</Title>
                                    <Text>{"Địa chỉ:"+this.state.order.CustomerAddress}</Text>
                                    <Text>{"Điện thoại:"+this.state.order.CustomerPhone}</Text>
                                    <Text>{this.state.order.CustomerEmail?("Email:"+this.state.order.CustomerEmail):null}</Text>
                                </Space>
                            </Card>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
                            <Card title="HÌNH THỨC GIAO HÀNG">
                                <Space direction="vertical">
                                    <Text>{"Hinh Thuc:"+this.state.order.ShipmentMethod}</Text>
                                    <Text>{"Phi:"+this.state.order.ShipmentPrice}</Text>
                                </Space>
                            </Card>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
                            <Card title="HÌNH THỨC THANH TOÁN">
                                <Space direction="vertical">
                                    <Text>{"Hinh Thuc:"+this.state.order.PaymentMethod}</Text>
                                </Space>
                            </Card>
                        </Col>

                    </Row>

                    <Row type="flex">
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                        <Card title={<Row type="flex">
                                                <Col span={8}>
                                                    {"Ten"}
                                                </Col>
                                                <Col span={3}>
                                                    {"Quantity"}
                                                </Col>
                                                <Col span={3}>
                                                    {"UnitPrice"}
                                                </Col>
                                                <Col span={3}>
                                                    {"Giam Gia"}
                                                </Col>
                                                <Col span={3}>
                                                    {"Tam Tinh"}
                                                </Col>
                                                <Col span={3}>
                                                </Col>
                                </Row>}>
                        <List
                            itemLayout="vertical"
                            dataSource={this.state.orderItems}
                            renderItem={item => {
                                return (<List.Item
                                    key={item.id}
                                >
                                    <List.Item.Meta
                                        title={
                                            <Row type="flex">
                                                <Col span={8}>
                                                    {item.Name}
                                                </Col>
                                                <Col span={3}>
                                                    {item.Quantity}
                                                </Col>
                                                <Col span={3}>
                                                    {item.UnitPrice}
                                                </Col>
                                                <Col span={3}>
                                                    {item.UnitPrice - item.FinalUnitPrice}
                                                </Col>
                                                <Col span={3}>
                                                    {item.FinalTotalPrice}
                                                </Col>
                                                <Col span={3}>
                                                    <img
                                                        alt="logo"
                                                        src={item.ImageURL}
                                                    />
                                                </Col>
                                            </Row>
                                            }
                                    />
                                    
                                </List.Item>)
                            }}
                        />

                        <Descriptions column={1} bordered={false}>
                            <Descriptions.Item label="Tien Hang">{"TODOOO"}</Descriptions.Item>
                            <Descriptions.Item label="Tien Ship">{"TODOOO"}</Descriptions.Item>
                            <Descriptions.Item label={
                                <span style={{color:"#1890FF", fontSize: "1.2em"}}>Thành Tiền</span>
                            }>
                                <span style={{color:"#1890FF", fontSize: "1.2em"}}>
                                {"TODOOO"}</span>
                            </Descriptions.Item>
                        </Descriptions>
                        </Card>
                        </Col>
                    </Row>
                    </Card>
                </Col>
            </Row>
            )
        }
        return (
            <MyLayout>
                <Head>
                    <title>Order View</title>
                </Head>
                <Row>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Card title="Xin Hay Dien Order Number">
                        <div style={{maxWidth: "420px", margin: "0 auto"}}>
                        <div className="login-content">
                        <Form ref={this.formRef} onFinish={this.handleSubmit} className="login-form">
                            <Form.Item name="ordernumber"
                                rules={[
                                {
                                    required: true,
                                    message: 'Please input Order Number!',
                                },
                                ]}
                            >
                                <Input prefix={<SearchOutlined />} placeholder="Order Number" size="large"/>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" size="large" style={{width: "100%"}}>Search</Button>
                            </Form.Item>
                        </Form>
                        </div>
                        </div>
                    </Card>
                </Col>
                </Row>

                {viewResult}
                
            </MyLayout>
        );
    }
}

  
export default withRouter(OrderView)

