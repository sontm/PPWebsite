import React, { Component } from 'react'
import Link from 'next/link'
import { withRouter } from "next/router";
import { Form, Row, Col,Radio, InputNumber, Input, Button, Card, Descriptions } from 'antd';
import { Typography, Space } from 'antd';
import {UserOutlined, PhoneOutlined, MailOutlined, BookOutlined} from '@ant-design/icons';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Head from 'next/head'
import MyLayout from '../components/layout';
import {STORAGE_TEMP_ADDRESS} from '../util/AppConstant'
import styles from './cart.module.css'
import helpers from '../util/Helpers'

import {actUserGetCartItems, actUserGetProductsInCart, actUserDeleteCartItem} from '../redux/UserReducer'
import backend from '../util/Backend';

const { Text, Title } = Typography;


class Checkout extends Component {
    constructor(props) {
        super(props)

        this.isLoadCartDone = false;
        this.isLoadProdDone = false;
        this.isLoadTempAddr = false;

        this.placeOrder = this.placeOrder.bind(this)
        this.editCart = this.editCart.bind(this)

        this.state = {
            paymentValue: 1,
        };

        this.formRef = React.createRef();
    }

    editCart () {
        // Save temporary Address to Local Storage, then back to cart page
        let curAddress = this.formRef.current.getFieldValue();
        
        console.log(curAddress)
        localStorage.setItem(STORAGE_TEMP_ADDRESS, JSON.stringify(curAddress));

        this.props.router.push({ pathname: '/cart'})
    }

    placeOrder(cartItems) {
        let curAddress = this.formRef.current.getFieldValue();
        
        console.log(curAddress)
        localStorage.setItem(STORAGE_TEMP_ADDRESS, JSON.stringify(curAddress));

        let orderNumber = helpers.makeRandomAlphaNumeric(9);
        backend.addUserOrder(
            {
                UserID: (this.props.user && this.props.user.userProfile) ? this.props.user.userProfile.id: null,
                CustomerName: curAddress.fullname,
                CustomerPhone:curAddress.phone,
                CustomerEmail:curAddress.email,
                CustomerAddress:curAddress.address,
                OrderNumber: orderNumber,
                DatePlaced: Date.now(),
                Status: "Placed",
                ShipmentMethod: "", // Grab or Self
                ShipmentPrice: 20000,
                PaymentMethod: "COD", // COD or BANK  TODO
                PaymentInfo: "Vietcombank XX"
            },
            response => {
                console.log("addUserOrder Done&&&&&&&&&&&&&&&&&&&&&&&&6")
                console.log(response.data)


                let orderItems = [];
                cartItems.forEach(element => {
                    let attString = "";
                    if (element.Product.prod_attributes && element.Product.prod_attributes.length) {
                        element.Product.prod_attributes.forEach(att => {
                            attString += att.Name+":"+att.Value+",";
                        })
                    }
                    orderItems.push({
                        Name:element.Product.Name,
                        ShortDescription:element.Product.ShortDescription,
                        UnitPrice:element.Product.UnitPrice,
                        //Images:element.Product.Images, // TODO if only parent image
                        ImageURL: element.ImageURL,
                        CategoryName:element.Product.prod_category.Name,
                        CategoryID:element.Product.prod_category.id,
                        BrandName:element.Product.prod_brand.Name,
                        BrandID:element.Product.prod_brand.id,
                        AttributeString:attString,
                        DiscountValue:element.discountInfo.bestDiscount?element.discountInfo.bestDiscount:0,
                        DiscountUnit:element.discountInfo.unit?element.discountInfo.unit:"",
                        DiscountDesc:element.discountInfo.desc?element.discountInfo.desc:"",
                        DiscountCoupon:""+(element.discountInfo.coupon?element.discountInfo.coupon:""),
                        DiscountGift:element.discountInfo.giftDesc?element.discountInfo.giftDesc:"",
                        FinalUnitPrice:element.discountInfo.newPrice,
                        Quantity:element.Quantity,
                        FinalTotalPrice:element.Quantity*element.discountInfo.newPrice,
                        ParentOrderNumber:orderNumber
                    })
                })

                // console.log(orderItems)
                if (orderItems.length) {
                    backend.addUserOrderItem(orderItems,
                    response2 => {
                        console.log("addUserOrderItem Done&&&&&&&&&&&&&&&&&&&&&&&&6")
                        // Active: true
                        // ProductID: "5f57b1eff958e833c62f8d4c"
                        // Quantity: 4
                        // UserID: "5f709e5101479d0499b6243d"
                        // createdAt: "2020-10-04T05:51:20.442Z"
                        // id: "5f7962d73092c0056e3799f4"
                        console.log(response2.data)
                    },
                    error2 => {
                        console.log("addUserOrderItem error")
                        console.log(error2)
                    }); 
                }
            },
            error => {
                console.log("addUserOrder error")
                console.log(error)
            }); 
    }
    onChangePayment = e => {
        console.log('radio checked', e.target.value);
        this.setState({
            paymentValue: e.target.value,
        });
    };


    componentDidUpdate() {
        // 
        console.log("-----Checkout componentDidUpdate-------:" +  this.isLoadTempAddr)
        if (!this.isLoadTempAddr) {
            let v = localStorage.getItem(STORAGE_TEMP_ADDRESS);
            this.initialAddress = JSON.parse(v);
            this.isLoadTempAddr = true;
            this.formRef.current.setFieldsValue(this.initialAddress);
        }

        if (!this.isLoadCartDone) {
            console.log("    Get User Carts Items ------")
            if (this.props.user.userProfile && this.props.user.userProfile.id) {
                this.props.actUserGetCartItems(this.props.user.userProfile.id);
            } else {
                this.props.actUserGetCartItems( null );
            }
            
            this.isLoadCartDone = true;
        }
        if (!this.isLoadProdDone && this.props.user.cartItems.length > 0 &&
                (!this.props.product.cartProducts || this.props.product.cartProducts.length < 1)) {
            // Get products info
            console.log("    Get Product Info------")
            let productIds = [];
            this.props.user.cartItems.forEach(element => {
                console.log(element)
                productIds.push(element.ProductID)
            });
            console.log("   productIDs")
            console.log(productIds)
            this.props.actUserGetProductsInCart(productIds);
            this.isLoadProdDone = true;
        }
    }
    render() {
        console.log("$$$$$$$$$$$$$$$$$$$ CHeckoutPage render:")
        let initialAddress = {...this.initialAddress};
        
        let cartItems = [...this.props.user.cartItems];
        cartItems.forEach(item => {
            if (item.Product) {
                item.discountInfo = helpers.parseDiscountInformation(item.Product, 
                    this.props.siteInfo.categories, this.props.siteInfo.brands);

                let productImages = item.Product.Images;
                if (!productImages || !productImages.length) {
                    productImages = item.Product.prod_parent.Images;
                }

                item.ImageURL = (productImages &&productImages.length) ? productImages[0].formats.thumbnail.url : "";

            }
        })
        console.log(cartItems)
        let addressView = [];
        // if (this.props.user.address.length > 0) {
        //     // Sort address which selected address to Front
        //     let sortedAddress = [...this.props.user.address];
        //     let selectedAdd = null;
        //     for (let l = 0; l < sortedAddress.length; l++) {
        //         if (sortedAddress[l].id == this.props.user.checkoutAddressId ) {
        //             selectedAdd = sortedAddress[l];
        //             break;
        //         }
        //     }
        //     if (selectedAdd) {
        //         // Move to First
        //         sortedAddress.splice(sortedAddress.indexOf(selectedAdd), 1);
        //         sortedAddress.unshift(selectedAdd);
        //     }

        //     let defaultView = (
        //         <div style={{display:"inline-block"}}>
        //             <Icon type="check-circle" theme="twoTone" twoToneColor="#1890FF" />
        //             {"  "}
        //             <span style={{color: "#1890FF"}}>Sẽ Giao Đến Địa Chỉ Này</span>
        //         </div>
        //     )
        //     sortedAddress.forEach(element => {
        //         addressView.push(
        //         <div><Row><Card size="small" title={
        //             <div><span>{element.fullName + "    "}</span>
        //             {element.id == this.props.user.checkoutAddressId ? defaultView : ""}
        //             </div>
        //             }
        //             extra={element.id != this.props.user.checkoutAddressId ? 
        //             (<Button type="primary" size="small"
        //                     onClick={e => {this.props.actUserSetCheckoutAddress(element.id)}}>
        //                 Giao Đến Địa Chỉ Này
        //             </Button>) : ""}
        //             >
        //             <Descriptions column={1} size="small">
        //                 <Descriptions.Item label="Khách Hàng">{element.fullName}</Descriptions.Item>
        //                 <Descriptions.Item label="Địa Chỉ">
        //                     {element.address 
        //                     + (element.ward ? (", " + element.ward): "")
        //                     + (element.district ? (", " + element.district): "")
        //                     + (element.province ? (", " + element.province): "")
        //                     }
        //                 </Descriptions.Item>
        //                 <Descriptions.Item label="Số Điện Thoại">{element.phone}</Descriptions.Item>
        //             </Descriptions>
                    
        //         </Card></Row><br /></div>
        //         )
        //     });
            
        // }
        let orderItemViews=[];
        if (cartItems.length > 0) {
            let itemTotal = 0;
            let finalTotal = 0;
            cartItems.forEach(item => {
                if (item.Product) {
                    itemTotal += item.discountInfo.newPrice;
                    orderItemViews.push(
                        <Row>
                            <Col span={3}>
                                <img
                                    alt="logo"
                                    src={item.ImageURL}
                                />
                            </Col>
                            <Col span={15}>
                                <Link href="/products/[id]" as={`/products/${item.Product.id}`}>
                                    {item.Product.Name}
                                </Link>
                            </Col>
                            <Col span={6}>
                                {"x "+ item.Quantity + " = " + item.discountInfo.newPrice + "VND"}
                            </Col>
                        </Row>
                    )
                }
            })
            finalTotal = itemTotal;
            orderItemViews.push(
                <React.Fragment>
                <br/>
                <hr />
                <Descriptions column={1} bordered={true} size="small">
                    <Descriptions.Item label="Tạm Tính">{itemTotal}</Descriptions.Item>
                    <Descriptions.Item label="Phí Vận Chuyển">0 D</Descriptions.Item>
                    <Descriptions.Item label={
                        <span style={{color:"#1890FF", fontSize: "1.2em"}}>Thành Tiền</span>
                    }>
                        <span style={{color:"#1890FF", fontSize: "1.2em"}}>
                        {finalTotal}</span>
                    </Descriptions.Item>
                </Descriptions>
                </React.Fragment>
            )
        }
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        return (
            <MyLayout>
                <Head>
                    <title>Checkout</title>
                </Head>
                <Row>
                <Col xs={24} sm={24} md={16} lg={16} xl={16} xxl={16}>
                    <Card title="Địa Chỉ Giao Hang" style={{marginRight: "5px"}}>
                    <div style={{maxWidth: "450px", margin: "0 auto"}}>
                    <div className="login-content">
                    <Form ref={this.formRef} onFinish={this.handleSubmit} className="login-form">
                        <Form.Item name="fullname"
                            rules={[
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                            ]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="Name" size="large"/>
                        </Form.Item>

                        <Form.Item name="phone"
                            rules={[
                            {
                                type: 'number',
                                message: 'The input is not valid Phone!',
                            },
                            {
                                required: true,
                                message: 'Please input your Phone!',
                            },
                            ]}
                        >
                            <Input prefix={<PhoneOutlined />} placeholder="Phone" size="large"/>
                        </Form.Item>

                        <Form.Item name="email"
                            rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            ]}
                        >
                            <Input prefix={<MailOutlined />} placeholder="Email" size="large"/>
                        </Form.Item>

                        <Form.Item name="address"
                            rules={[
                            {
                                required: true,
                                message: 'Please input your Address!',
                            },
                            ]}
                        >
                            <Input prefix={<BookOutlined />} placeholder="Address" size="large"/>
                        </Form.Item>
                    </Form>
                    </div>
                    </div>
                    </Card>

                    < br/>

                    <Card title="Phuong Thuc Thanh Toan" style={{marginRight: "5px"}}>
                    <Radio.Group onChange={this.onChangePayment} value={this.state.paymentValue} style={{width: "100%"}}>
                        <Radio style={radioStyle} value={1}>
                        Thanh Toan Khi Giao Hang (COD)
                        <br />
                        <Text type="secondary">Quý khách lưu ý: Nội thành Hà Nội, TP.HCM, Đà Nẵng 
                        với đơn trên 700k sẽ Free Ship. Xin chân thành cám ơn!</Text>
                        </Radio>
                    </Radio.Group>
                    <Radio.Group onChange={this.onChangePayment} value={this.state.paymentValue} style={{width: "100%"}}>
                        <Radio style={radioStyle} value={2}>
                        Chuyen Khoan Ngan Hang
                        {this.state.paymentValue === 2 ? 
                        <Row>
                            <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                                <img
                                    alt="Vietcombank"
                                    src={"/images/resource/bank_vcb.jpg"}
                                    style={{width: "140px", height: "50px"}}
                                />
                            </Col>
                            <Col xs={18} sm={18} md={18} lg={18} xl={18} xxl={18}>
                                <Space direction="vertical">
                                    <Title level={5}>Vietcombank</Title>
                                    <Text type="secondary">Số tài khoản: 1016789999</Text>
                                    <Text type="secondary">Chủ tài khoản: XXX</Text>
                                    <Text type="secondary">Chi nhánh: YYY</Text>
                                </Space>
                            </Col>
                        </Row> : null}
                        </Radio>
                    </Radio.Group>
                    </Card>
                </Col>

                <Col xs={24} sm={24} md={8} lg={8} xl={8} xxl={8}>
                    <Card title="Xác Nhận Đơn Hàng" 
                        extra={
                            <Button type="primary" size="small" onClick={this.editCart}>Chỉnh Sửa</Button>
                        }>

                        {orderItemViews}
                    </Card>
                </Col>
                </Row>
                <br/>
                <Row>
                    <div style={{display: "flex",justifyContent: "center"}}>
                    <Button type="primary" size="large" onClick={() => this.placeOrder(cartItems)}
                        style={{width: "300px", height:"50px", fontSize:"1.5em"}}>Đặt Mua</Button>
                    </div>
                </Row>
                
            </MyLayout>
        );
    }
}

const mapStateToProps = (state) => (state);
const mapDispatchToProps = (dispatch) => {
    return {
        actUserGetProductsInCart: bindActionCreators(actUserGetProductsInCart, dispatch),
        actUserGetCartItems: bindActionCreators(actUserGetCartItems, dispatch),
        actUserDeleteCartItem: bindActionCreators(actUserDeleteCartItem, dispatch),
    }
}
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Checkout))

