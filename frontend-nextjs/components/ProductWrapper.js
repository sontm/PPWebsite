import React from 'react';
import styles from './ProductWrapper.module.css';
import Link from 'next/link'
import Head from 'next/head'
import { Card, Row, Col, Button } from 'antd';
import helpers from '../util/Helpers'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {actUserUpdateCartItem} from '../redux/UserReducer';

class ProductWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.onAddToCart = this.onAddToCart.bind(this);
    }

    onAddToCart(e) {
        console.log("onAddToCart:" + this.props.product.name)
        // Stop onLick of parent to go Product Detail
        e.stopPropagation()
        this.props.actUserUpdateCartItem(
            this.props.user.userProfile.id ,
            this.props.product.id,
            1
            )
        if (this.props.user.isLogined) {
            //this.props.actUserUpdateCartItem(this.props.user.userProfile.id ,this.props.product.id, 1)
        } else {
            // TODO check Login
            //this.props.history.replace({pathname: "/login", state: { from: this.props.location }})
            //this.props.actCartAddToCart(this.props.product.id)
        }
    }

    render() {
        //console.log(this)
        let product = this.props.product;
        let discountInfo = {hasGift:80, coupon:"XXX"};
        return (
            <Card className={styles['product-wrapper']}>
                {discountInfo.hasGift ? (
                    <div className={styles['gift-banner']}/>) : ("")}
                {discountInfo.bestDiscount > 0 ? (
                    <div className={styles['discount-banner']}>
                    {helpers.convertPriceToShortAbbr(discountInfo.bestDiscount)}
                    </div>) 
                : ("")}
                {(discountInfo.coupon && discountInfo.hasGift) ? (
                    <div className={styles['coupon-banner-belowgift']}>{discountInfo.coupon}</div>) : 
                    (discountInfo.coupon) ? <div className={styles['coupon-banner']}>{discountInfo.coupon}</div> : ("")}
                
                <Link href="/products/[id]" as={`/products/${product.id}`}>
                <a><div className={styles['image-thump']}>
                    <img src={product.Images[0].formats.thumbnail.url}/>
                </div></a>
                </Link>
                <div className={styles['product-title']}>
                    <Link href="/products/[id]" as={`/products/${product.id}`}>
                        <a><span style={{color: "#1890FF", cursor: "pointer"}}>{product.Name}</span></a>
                    </Link>
                </div>
            
                <div className={styles['product-price']}>
                    {product.UnitPrice}đ
                </div>
                <div className={styles['product-price-old']}>
                    {product.UnitPrice + "đ"}
                </div>
                <div className={styles['product-price-discount']}>
                    {discountInfo.bestDiscount > 0 ? ("-" + discountInfo.bestDiscount + discountInfo.unit): ""}
                </div>
                <div className={styles['product-quantity']}>
                    {product.StockNumber ? ("x " + product.StockNumber) : null}
                </div>
                {/* {this.renderDiscountInfos(discountInfo.discounts)} */}

                <div className={styles['empty-space-36pxheight']} />
                
                <Button type="primary" className={styles['btn-addtocart']} 
                    onClick={this.onAddToCart}>Add to Cart</Button>
                
            </Card>
        )
    }

}

const mapStateToProps = (state) => (state);
const mapDispatchToProps = (dispatch) => {
    return {
        actUserUpdateCartItem: bindActionCreators(actUserUpdateCartItem, dispatch),
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ProductWrapper)