import styles from './ProductWrapper.module.css';
import Link from 'next/link'
import Head from 'next/head'
import { Card, Row, Col, Button } from 'antd';
import helpers from '../util/Helpers'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

function onClickProductDetail() {

}
function ProductWrapper(param) {
    let product = param.product;
    
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
            
            <Button type="primary" className={styles['btn-addtocart']} onClick={console.log("param.increaseCart")}>Add to Cart</Button>
            
        </Card>
    )

}

const mapStateToProps = (state) => (state);
const mapDispatchToProps = (dispatch) => {
    // return {
    //     increaseCart: bindActionCreators(increaseCart, dispatch),
    // }
    return {};
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ProductWrapper)