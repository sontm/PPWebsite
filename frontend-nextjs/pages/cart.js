import React, { Component } from 'react'
import Link from 'next/link'
import { List, Row, Col,Slider, InputNumber, Input, Button, Card, Descriptions } from 'antd';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Head from 'next/head'
import MyLayout from '../components/layout';
import {STORAGE_CART_PROD} from '../util/AppConstant'
import styles from './cart.module.css'

import {actProductGetProductsInCart} from '../redux/ProductReducer'
import {actUserGetCartItems} from '../redux/UserReducer'

const IconText = ({ type, text }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
);

// Example of Result Product
// [
//     {"id":2,"name":"Bánh xốp Fullo Vani Sữa (Fullo Stick Wafer Vanilla Milk) Trang",
//         "descShort":"","descMedium":"","descLong":"",
//         "unitPrice":10000,"stockNum":1000,"active":true,"imgThump":"images/products/BanhKeo/p2_1.jpg",
//         "img1":"images/products/BanhKeo/p2_1.jpg","img2":null,"img3":null,"img4":null,"img5":null,"img6":null,
//         "firstCategoryId":11,"secondCategoryId":4,"thirdCategoryId":1,"brandId":3,"parentProductId":null,
//         "productAttributeId":null,"createdAt":"","updatedAt":"",
        
//         "brands":
//             {"id":3,"name":"Orang Tua","imgLogo":null,"countryId":5,"active":true,
//             "createdAt":"2019-09-04T13:53:53.555Z","updatedAt":"2019-09-04T13:53:53.555Z",
                
//             "countries":{"id":5,"name":"Trung Quốc","code":"cn","createdAt":"","updatedAt":""}
//             },

//         "attributes":[{"id":2,"name":"Trắng","value":null,"attributeGroupId":1,"createdAt":"","updatedAt":"",
//             "attributeGroups":{"id":1,"name":"Màu Sắc","createdAt":"","updatedAt":""}
//         }]
//     }
// ]

// from "1,2,3" to [1,2,3]
function parseStringToArrayProductID(text) {
    if (text) {
        return text.split(',');
    }
    return [];
}

//[
    // {"userId":"18f40426-c47d-4547-a4e8-c874e61f8cd8",
    // "product":{"id":"5f57b185f958e833c62f8d48","name":"",
    // "quantity":1,"newPrice":19800000,"oldPrice":22000000,
    // "discountPercent":10},"active":true}
class CartPage extends Component {
    constructor(props) {
        super(props)
        this.isLoadCartDone = false;
        this.isLoadProdDone = false;
        //this.handleRemoveCartItem = this.handleRemoveCartItem.bind(this)
    }

    // handleRemoveCartItem(itemId) {
    //     console.log("handleRemoveCartItem:" + itemId)
    //     if (this.props.user.isLogined) {
    //         console.log("USER CART---------")
    //         this.props.actUserUpdateCartItem(this.props.user.userProfile.id,
    //             itemId, 0, true)
    //     } else {
    //         console.log("STORAGE CART---------")
    //         // TODO
    //     }
    // }
    componentDidMount() {
        console.log("-----Cart componentDidMount-------")
    }
    componentDidUpdate() {
        // 
        console.log("-----Cart componentDidUpdate-------")
        if (!this.isLoadCartDone && this.props.user.userProfile && this.props.user.userProfile.id) {
            this.props.actUserGetCartItems(this.props.user.userProfile.id);
            this.isLoadCartDone = true;
        }
        if (!this.isLoadProdDone && this.props.user.userProfile && this.props.user.cartItems.length > 0 &&
                (!this.props.product.cartProducts || this.props.product.cartProducts.length < 1)) {
            // Get products info
            let productIds = [];
            this.props.user.cartItems.forEach(element => {
                productIds.push(element.productId)
            });
            this.props.actProductGetProductsInCart(productIds);
            this.isLoadProdDone = true;
        }
    }
    render() {
        // console.log("STORAGE CART---------")
        // console.log(localStorage.getItem(STORAGE_CART_PROD))
        // let idArray = parseStringToArrayProductID(localStorage.getItem(STORAGE_CART_PROD))
        // console.log(idArray)
        // this.props.actProductGetProductsInCart(idArray)

        let itemTotal = 0;
        let finalTotal = 0;
        this.props.product.cartProducts.forEach(item => {
            itemTotal += item.UnitPrice;
            finalTotal += item.UnitPrice;
        })

        console.log("--_Cart Page, cartItems:");
        console.log(this.props.user.cartItems)
        console.log(this.props.product.cartProducts)
        return (
            <MyLayout>
                <Head>
                    <title>Cart</title>
                </Head>
                
                <Row className={styles['cart-product']}>
                    <Col xs={24} sm={24} md={24} lg={18} xl={18} xxl={18} 
                        style={{marginBottom: "10px"}}>
                    <List
                        itemLayout="vertical"
                        dataSource={
                            this.props.user.isLogined ? this.props.product.cartProducts: []}
                        renderItem={item => (
                        <List.Item
                            key={item.id}
                            actions={[
                                <Row>
                                <Button type="link" onClick={e => {
                                    console.log("this.handleRemoveCartItem(item.id)")
                                }}>Xoá</Button>,
                                <Button type="link">Để Dành Mua Sau</Button>,
                                <div className={styles['product-quantity']}>
                                    <span className={styles['product-quantity-text']}>&nbsp;&nbsp;Số Lượng (Hộp):&nbsp;&nbsp;</span>
                                    
                                    <Input style={{width: "120px", textAlign:"center"}}
                                        addonBefore={
                                            <span className="noselect">-</span>
                                        } 
                                        addonAfter={
                                            <span className="noselect">+</span>
                                        } 
                                        value={1} />
                                        
                                </div>
                                </Row>
                            ]}
                            extra={
                            <img
                                width={150}
                                alt="logo"
                                src={item.Images[0].formats.thumbnail.url}
                            />
                            }
                        >
                            <List.Item.Meta
                                title={<Link href="/products/[id]" as={`/products/${item.id}`}>
                                    {item.Name}
                                    </Link>}
                                
                                description={
                                    <div>
                                        <span>&nbsp;&nbsp;{"Nhãn Hiệu:"}&nbsp;</span>
                                        {/* <Link to={"/brand/" + item.brands.id}>{item.brands.name}</Link> */}
                                    </div>}
                            />
                            
                            <Row>
                            <Col xs={14} sm={14} md={14} lg={10} xl={10} xxl={10}>
                            <div className={styles['product-price']}>
                                {item.UnitPrice}đ
                            </div>
                            <div className={styles['product-price-old']}>
                                {item.UnitPrice}đ
                            </div>
                            
                            <div className={styles['product-price-discount']}>
                                -27%
                            </div>
                            
                            </Col>
                            <Col xs={0} sm={0} md={0} lg={4} xl={4} xxl={4}>

                            </Col>
                            <Col xs={10} sm={10} md={10} lg={10} xl={10} xxl={10}>
                            <div className={styles['product-sumprice-item']}>
                                {" x 3 = " + item.UnitPrice * 3 + "đ"}
                                <span>&nbsp;</span>
                            </div>
                            </Col>
                            </Row>
                            
                        </List.Item>
                        )}
                    />
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6}>
                        <Card size="med" title="Thanh Toan"
                                style={{paddingLeft: "5px"}}>
                            <Descriptions column={1} bordered={false}>
                                <Descriptions.Item label="Tạm Tính">{itemTotal}</Descriptions.Item>
                                <Descriptions.Item label={
                                    <span style={{color:"#1890FF", fontSize: "1.2em"}}>Thành Tiền</span>
                                }>
                                    <span style={{color:"#1890FF", fontSize: "1.2em"}}>
                                    {finalTotal}</span>
                                </Descriptions.Item>
                            </Descriptions>
                            <div style={{textAlign: "center"}}>
                                <Link href="/checkout">
                                <Button type="primary" size="large">Tiến Hành Đặt Hàng</Button>
                                </Link>
                            </div>
                        </Card>
                    </Col>
                </Row>
                </MyLayout>
        )
    }
}

const mapStateToProps = (state) => (state);
const mapDispatchToProps = (dispatch) => {
    return {
        actProductGetProductsInCart: bindActionCreators(actProductGetProductsInCart, dispatch),
        actUserGetCartItems: bindActionCreators(actUserGetCartItems, dispatch),
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(CartPage)
