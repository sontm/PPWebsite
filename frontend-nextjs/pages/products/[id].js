import React, { Component, useEffect } from 'react'
import MyLayout from '../../components/layout';
import styles from './product.module.css';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Link from 'next/link'
//import { useRouter } from 'next/router'
import { withRouter } from "next/router";

import ReactImageMagnify from 'react-image-magnify';
import ImageGallery from 'react-image-gallery';
import Carousel, { Modal, ModalGateway } from 'react-images';

import ProductDetailImageList from '../../components/ProductDetailImageList';

import Head from 'next/head'
import axios from "axios";
import dynamic from 'next/dynamic'
import AppConstants from '../../util/AppConstant'

import { Card, Row, Col, Button, Input } from 'antd';
import {HeartOutlined, PhoneOutlined, MailOutlined} from '@ant-design/icons';

import Helpers from '../../util/Helpers'
import {actUserUpdateCartItem} from '../../redux/UserReducer';

// "Images": [
//     {
//     "url": "xxx",
//     "formats": {
//     "thumbnail": {
//     "url": "xxx"
//     },
//     "large": {
//     "url": "xxx"
//     },
//     "medium": {

//     "url": "xxx"
//     },
//     "small": {

//     "url": "xxx"
//     }
// },]
function parseImagesFromProduct(product) {
    let result = [];
    if (product.Images && product.Images.length > 0) {
        product.Images.forEach(element => {
            if (element.formats.large) {
                result.push({src: element.formats.large.url, source: element.formats.large.url, 
                    thumb:element.formats.thumbnail.url});
            } else if (element.formats.medium) {
                result.push({src: element.formats.medium.url, source: element.formats.medium.url, 
                    thumb:element.formats.thumbnail.url})
            } else if (element.formats.small) {
                result.push({src: element.formats.small.url, source: element.formats.small.url, 
                    thumb:element.formats.thumbnail.url})
            } else {
                result.push({src: element.formats.thumbnail.url, source: element.formats.thumbnail.url,
                    thumb:element.formats.thumbnail.url})
            }
        });
    }
    return result;
}

function parseImagesFromProductForMobileList(product) {
    let result = [];
    if (product.Images && product.Images.length > 0) {
        product.Images.forEach(element => {
            if (element.formats.large) {
                result.push({original: element.formats.large.url, 
                    thumbnail:element.formats.thumbnail.url,
                    originalClass: styles['image-list-mobile']});
            } else if (element.formats.medium) {
                result.push({original: element.formats.medium.url, 
                    thumbnail:element.formats.thumbnail.url,
                    originalClass: styles['image-list-mobile']});
            } else if (element.formats.small) {
                result.push({original: element.formats.small.url, 
                    thumbnail:element.formats.thumbnail.url,
                    originalClass: styles['image-list-mobile']});
            } else {
                result.push({original: element.formats.thumbnail.url, 
                    thumbnail:element.formats.thumbnail.url,
                    originalClass: styles['image-list-mobile']});
            }
        });
    }
    return result;
}

class Product extends Component {
    constructor(props) {
        super(props);
        this.onAddToCart = this.onAddToCart.bind(this);
        // this.onAddToFav = this.onAddToFav.bind(this);
        this.onClickProductDetail = this.onClickProductDetail.bind(this);
        this.onCloseModelImages = this.onCloseModelImages.bind(this);
        this.onClickAttributeNewPrice = this.onClickAttributeNewPrice.bind(this);
        
        this.onClickThumbnail = this.onClickThumbnail.bind(this)
        this.state ={
            curSelectImage: "",
            isOpenModelImages: false,
            isShowMore : false
        }

        this.prevProductDetail = null;
        //this.router = useRouter();
    }

    onAddToCart(e) {
        console.log("onAddToCart:" + this.props.data.Name)
        // Stop onLick of parent to go Product Detail
        e.stopPropagation()
        this.props.actUserUpdateCartItem(
            this.props.user.userProfile.id ,
            this.props.data.id,
            null
            )
        if (this.props.user.isLogined) {
            //this.props.actUserUpdateCartItem(this.props.user.userProfile.id ,this.props.product.id, 1)
        } else {
            // TODO check Login
            //this.props.history.replace({pathname: "/login", state: { from: this.props.location }})
            //this.props.actCartAddToCart(this.props.product.id)
        }
    }

    onClickProductDetail(fromIdx) {
        console.log("onClickProductDetail")
        if (fromIdx) {
            this.setState({
                isOpenModelImages: true,
                isShowMore: true
            })
        } else {
            this.setState({
                isOpenModelImages: true,
                isShowMore: false
            })
        }
        
    }
    onCloseModelImages () {
        console.log("onCloseModelImages")
        this.setState({
            isOpenModelImages: false,
            isShowMore: false
        })
    }
    onClickThumbnail(item) {
        console.log("onClickThumbnail")
        console.log(item)
        this.setState({
            curSelectImage: item.src
        })
    }

    onClickAttributeNewPrice(pid, spid) {
        // Only Shallow Routing is Ok https://nextjs.org/docs/routing/shallow-routing
        console.log("onClickAttributeNewPrice:" + pid+",spid:"+ spid);
        this.props.router.replace({ pathname: '/products/[id]', query: { spid: spid }}, 
            `/products/${pid}`, {shallow: true})
        
    }

    componentDidMount() {
        console.log("ProductDetail did mount----------")
        // When have just Receive Product Detail4
        if (this.props.data) {
            if (this.props.data.Images.length > 0) {
                let defaultSrc = this.props.data.Images[0].formats.thumbnail.url;
                if (this.props.data.Images[0].formats.medium) {
                    defaultSrc = this.props.data.Images[0].formats.medium.url;
                } else if (this.props.data.Images[0].formats.small) {
                    defaultSrc = this.props.data.Images[0].formats.small.url;
                }
                this.setState({
                    curSelectImage: defaultSrc
                })
            }
        }
    }

    componentDidUpdate() {
        console.log("ProductDetail did update----------")
        // When have just Receive Product Detail4
        // if (this.props.data) {
        //     if (this.props.data.Images.length > 0) {
        //         let defaultSrc = this.props.data.Images[0].formats.thumbnail.url;
        //         if (this.props.data.Images[0].formats.medium) {
        //             defaultSrc = this.props.data.Images[0].formats.medium.url;
        //         } else if (this.props.data.Images[0].formats.small) {
        //             defaultSrc = this.props.data.Images[0].formats.small.url;
        //         }
        //         this.setState({
        //             curSelectImage: defaultSrc
        //         })
        //     }
        // }
    }

     // return {bestDiscount: 23, unit:"%|d", newPrice: 12, desc, hasGift:true, giftDesc,
    //      coupon: null|"JP20", bestCoupon:"", couponUnit:"%|K",couponDesc, discounts[]}
    render () {
        console.log("Query--------")
        console.log(this.props.router.query);
        let data = this.props.data;
        let subdata = data;
        if (this.props.router.query.spid) {
            for (let i = 0; i < data.prod_childs.length; i++) {
                if (data.prod_childs[i].id == this.props.router.query.spid) {
                    subdata = data.prod_childs[i];
                    break;
                }
            }
        }
        let discountInfo = Helpers.parseDiscountInformation(subdata, 
            this.props.categories, this.props.brands);
        

        console.log("Product--------")
        let images = parseImagesFromProduct(data);
        let imagesMobile = parseImagesFromProductForMobileList(data);
        console.log(images);
        const visibleNum = 5;
        let currentIndexImgCarousel = 0;
        images.forEach((item, idx) => {
            if (item.src == this.state.curSelectImage) {
                currentIndexImgCarousel = idx;
            }
        })
        let summarizeAttributes = {}; // {Color: [White, Grey]}
        let summarizeAttributesArr = [];
        if (data.prod_attributes) {
            data.prod_attributes.forEach(element => {
                element.spid = data.id;
                element.fullspid = data.id;
                if (summarizeAttributes[element.Name]) {
                    // when exist
                    summarizeAttributes[element.Name].push(element);
                } else {
                    summarizeAttributes[element.Name] = [element];
                }
            })
        }
        if (data.prod_childs) {
            data.prod_childs.forEach(c => {
                c.prod_attributes.forEach(element => {
                    element.spid = c.id;
                    element.fullspid = c.id; // id1-id2
                    if (summarizeAttributes[element.Name]) {
                        // when exist
                        let isExistAtt = false;
                        for (let i = 0; i < summarizeAttributes[element.Name].length; i++) {
                            if (summarizeAttributes[element.Name][i].Value == element.Value) {
                                isExistAtt = true;
                                // Append spid to this ID
                                summarizeAttributes[element.Name][i].fullspid += "-"+c.id;
                                break;
                            }
                        }
                        if (!isExistAtt) {
                            summarizeAttributes[element.Name].push(element);
                        }
                        
                    } else {
                        summarizeAttributes[element.Name] = [element];
                    }
                })
            })
        }
        console.log("Total Attributes++++++++++++++++++++++++++")
        console.log(summarizeAttributes)
        for (let prop in summarizeAttributes) {
            // Because these two Obj share same prop, so set in 1 for loop
            if (Object.prototype.hasOwnProperty.call(summarizeAttributes, prop)) {
                    summarizeAttributesArr.push(summarizeAttributes[prop]);
            }
        }
        console.log(summarizeAttributesArr)
        return (
            <MyLayout>
                
            <Head>
                <title>{subdata.Name ? subdata.Name : data.Name}</title>
            </Head>
            
            {/* <div dangerouslySetInnerHTML={{ __html: data.LongDescription }} /> */}
                <ModalGateway>
                    {this.state.isOpenModelImages ? (
                    <Modal onClose={this.onCloseModelImages} className={styles['modal-product-images-fontmost']}>
                        <Carousel views={images} 
                         currentIndex={currentIndexImgCarousel}/>
                    </Modal>
                    ) : null}
                </ModalGateway>
                <Row className={styles['product-detail']}>
                    <Col xs={24} sm={24} md={24} lg={3} xl={3} xxl={3} key={"imglist"}>
                        <div className={styles['image-list-mobile-container']}>
                            <ImageGallery items={imagesMobile} showThumbnails={false} 
                                showPlayButton={false} autoPlay={true} showFullscreenButton={false}
                                showBullets={true} showIndex={true}
                            />
                        </div>
                        <div className={styles['image-list-container']}>
                            <ProductDetailImageList images={images} visibleNum={visibleNum}
                                thumbnailHeight={"80px"} 
                                onClick={this.onClickThumbnail}
                                onClickMore={this.onClickProductDetail}
                                />
                        </div>
                    </Col>
                    <Col xs={0} sm={0} md={0} lg={9} xl={11} xxl={11} >
                        <div 
                        onClick={this.onClickProductDetail} 
                        style={{paddingRight:"30px"}}>
                        <ReactImageMagnify {...{
                            smallImage: {
                                alt: 'SmallImage',
                                isFluidWidth: true,
                                src: this.state.curSelectImage,
                                srcSet: this.srcSet,
                                sizes: '(max-width: 480px) 100vw, (max-width: 1200px) 30vw, 360px'
                            },
                            largeImage: {
                                src: this.state.curSelectImage,
                                width: 1000,
                                height: 1000
                            },
                            enlargedImageContainerDimensions: {
                                width: '150%',
                                height: '120%'
                            },
                            isHintEnabled: true,
                            shouldHideHintAfterFirstActivation: false
                        }} 
                        hoverDelayInMs={50} fadeDurationInMs={100} pressDuration={150}
                        hintTextMouse={"Rê Chuột Để Phóng To"} 
                        hintTextTouch={"Chạm Để Phóng To"}
                        enlargedImageContainerClassName={styles['image-main-magnify']}
                        />
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12} xl={10} xxl={10} style={{padding: "10px"}}>
                        <div className={styles['product-title']}>
                            {subdata.Name ? subdata.Name : data.Name}
                        </div>
                        <div className={styles['product-price-intro']}>
                            <span>Thương Hiệu:&nbsp;</span>
                            <span className={styles['product-brand']}>
                            <Link href="/brands/[id]" as={`/brands/${data.prod_brand.id}`}>
                                <a>{data.prod_brand.Name}</a>
                            </Link></span>
                        </div>
                        <hr />
                        <div className={styles['product-price']}>
                            {discountInfo.newPrice}đ
                        </div>
                        <div className={styles['product-price-intro']}>
                            <span>Tiet Kiem:&nbsp;</span>
                            <span className={styles['product-price-discount']}>
                            {discountInfo.bestDiscount > 0 ? ("-" + discountInfo.bestDiscount + discountInfo.unit): ""}
                            </span>
                        </div>
                        <div className={styles['product-price-old']}>
                            <span>Gia Goc:&nbsp;</span>
                            {subdata.UnitPrice + "đ"}
                        </div>

                        <div className={styles['product-price']}>
                            {discountInfo.coupon+": "+discountInfo.bestCoupon+discountInfo.couponUnit}
                            <p>
                                {discountInfo.couponDesc}
                            </p>
                        </div>
                        <div className={styles['product-price']}>
                            {discountInfo.giftDesc}
                        </div>
                        <hr />
                        
                        <div className={styles['product-desc-medium']}>
                            <div dangerouslySetInnerHTML={{ 
                                __html: subdata.ShortDescription ? subdata.ShortDescription : data.ShortDescription }} />
                        </div>

                        <hr />
                        {/* {this.renderDiscountInfos(discountInfo.discounts)} */}
                        {
                            summarizeAttributesArr.map(element => (
                                <Row style={{textAlign: "center"}}>
                                    <span>{element[0].Name+": "}</span>
                                    {element.map((attr, idx) => (
                                        <Button size={"small"} type={attr.fullspid.indexOf(subdata.id) >= 0 ? "primary": ""} 
                                        onClick={() => this.onClickAttributeNewPrice(data.id, attr.spid)}>
                                            {attr.Value}
                                        </Button>
                                    ))}
                                    
                                </Row>
                            ))
                        }
                        
                        <Row style={{textAlign: "center"}}>
                            <span>Số Lượng (Hộp):&nbsp;&nbsp;</span>
                            <Input style={{width: "120px", textAlign:"center"}}
                                addonBefore={
                                    <span className="noselect">-</span>
                                } 
                                addonAfter={
                                    <span className="noselect">+</span>
                                } 
                                value={1} />
                        
                            <Button size={"medium"} type="primary" 
                            className={styles['btn-addtocart']} onClick={this.onAddToCart}>
                                CHỌN MUA
                            </Button>

                            <Button size={"medium"} type="primary" 
                            className={styles['btn-addtofav']} onClick={console.log("Add Fav")} title={"Thêm Vào Yêu Thích"}>
                                <HeartOutlined style={{fontSize: "20px"}}/> Thêm Vào Yêu Thích
                            </Button>

                        </Row>
                        <br />
                        <hr />
                        <Link href="/reportIncorrect/[id]" as={`/reportIncorrect/${data.id}`}>
                            <a>Phan Anh San Pham Khong Chinh Xac</a>
                        </Link>
                    </Col>
                </Row>

                <Row style={{backgroundColor: "white"}}>
                    <div className={styles['product-desc-medium']} dangerouslySetInnerHTML={{ 
                        __html: subdata.LongDescription?subdata.LongDescription:data.LongDescription }} />
                </Row>
            </MyLayout>
        )
    }
}

const mapStateToProps = (state) => (state);
const mapDispatchToProps = (dispatch) => {
    return {
        actUserUpdateCartItem: bindActionCreators(actUserUpdateCartItem, dispatch),
    }
}
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Product));

export async function getStaticPaths() {
    // Return a list of possible value for id
    const res = await axios.get(AppConstants.API_CMS_URL+"/prod-products")
    const arrNews = await res.data
    // Only add Product which is Parents: has some childs, no Parent
    const paths = arrNews.map(n => {
        //if (!n.prod_parent) {
            return {
                params: {
                    id: n._id
                }
            }
        //}
    })
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    // Fetch necessary data for the blog post using params.id
    console.log("Params---------------------------------")
    console.log(params)
    const res = await axios.get(AppConstants.API_CMS_URL+"/prod-products/"+ params.id)
    const newsData = await res.data

    // Get List of Categories
    const resAllCate = await axios.get(AppConstants.API_CMS_URL+"/prod-categories")
    const categories = await resAllCate.data;

    const resAllBrand = await axios.get(AppConstants.API_CMS_URL+"/prod-brands")
    const brands = await resAllBrand.data;

    return {
        props: {
            data: newsData,
            categories,
            brands
        }
    }
}