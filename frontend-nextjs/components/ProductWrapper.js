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
        console.log("onAddToCart:" + this.props.singleProduct.Name)
        // Stop onLick of parent to go Product Detail
        e.stopPropagation()
        this.props.actUserUpdateCartItem(
            this.props.user.userProfile ? this.props.user.userProfile.id : null,
            this.props.singleProduct.id,
            null
            )
    }

    // return {bestDiscount: 23, unit:"%|d", newPrice: 12, hasGift:true, 
    //      coupon: null|"JP20", bestCoupon:"", couponUnit:"%|K",discounts[]}
    render() {
        let product = this.props.singleProduct;
        //let discountInfo = {hasGift:80, coupon:"XXX"};
        let discountInfo = helpers.parseDiscountInformation(product, 
            this.props.categories, this.props.brands);

        let productImages = product.Images;
        if (!productImages || !productImages.length) {
            productImages = product.prod_parent.Images;
        }
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
                    <img src={(productImages.length > 0) ? productImages[0].formats.thumbnail.url : ""}/>
                </div></a>
                </Link>
                <div className={styles['product-title']}>
                    <Link href="/products/[id]" as={`/products/${product.id}`}>
                        <a><span style={{color: "#1890FF", cursor: "pointer"}}>{product.Name}</span></a>
                    </Link>
                </div>
            
                <div className={styles['product-price']}>
                    {discountInfo.newPrice}đ
                </div>
                {discountInfo.bestDiscount > 0 ? (
                <div className={styles['product-price-old']}>
                    {product.UnitPrice + "đ"}
                </div>) : null }
                <div className={styles['product-price-discount']}>
                    {discountInfo.bestDiscount > 0 ? ("-" + discountInfo.bestDiscount + discountInfo.unit): ""}
                </div>
                {/* <div className={styles['product-quantity']}>
                    {product.StockNumber ? ("x " + product.StockNumber) : null}
                </div> */}
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