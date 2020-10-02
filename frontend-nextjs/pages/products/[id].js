import React, { Component, useEffect } from 'react'
import MyLayout from '../../components/layout';
import styles from './product.module.css';

import Link from 'next/link'

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

export default class Product extends Component {
    constructor(props) {
        super(props);
        // this.onAddToCart = this.onAddToCart.bind(this);
        // this.onAddToFav = this.onAddToFav.bind(this);
        this.onClickProductDetail = this.onClickProductDetail.bind(this);
        this.onCloseModelImages = this.onCloseModelImages.bind(this);
        
        this.onClickThumbnail = this.onClickThumbnail.bind(this)
        this.state ={
            curSelectImage: "",
            isOpenModelImages: false,
            isShowMore : false
        }

        this.prevProductDetail = null;
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

    render () {
        let data = this.props.data;
        let discountInfo= {newPrice: data.UnitPrice};
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
        return (
            <MyLayout>
                
            <Head>
                <title>{data.Name}</title>
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
                        <style jsx>{`
                            .image-gallery-icon {
                                color: #fff;
                                transition: all .2s ease-out;
                                appearance: none;
                                background-color: transparent;
                                border: 0;
                                cursor: pointer;
                                outline: none;
                                position: absolute;
                                z-index: 4;
                                filter: drop-shadow(0 2px 2px #1a1a1a); }
                                @media (min-width: 768px) {
                                .image-gallery-icon:hover {
                                    color: #337ab7; }
                                    .image-gallery-icon:hover .image-gallery-svg {
                                    transform: scale(1.1); } }
                                .image-gallery-icon:focus {
                                outline: 2px solid #337ab7; }
                            
                            .image-gallery-using-mouse .image-gallery-icon:focus {
                                outline: none; }
                            
                            .image-gallery-fullscreen-button,
                            .image-gallery-play-button {
                                bottom: 0;
                                padding: 20px; }
                                .image-gallery-fullscreen-button .image-gallery-svg,
                                .image-gallery-play-button .image-gallery-svg {
                                height: 36px;
                                width: 36px; }
                                @media (max-width: 768px) {
                                .image-gallery-fullscreen-button,
                                .image-gallery-play-button {
                                    padding: 15px; }
                                    .image-gallery-fullscreen-button .image-gallery-svg,
                                    .image-gallery-play-button .image-gallery-svg {
                                    height: 24px;
                                    width: 24px; } }
                                @media (max-width: 480px) {
                                .image-gallery-fullscreen-button,
                                .image-gallery-play-button {
                                    padding: 10px; }
                                    .image-gallery-fullscreen-button .image-gallery-svg,
                                    .image-gallery-play-button .image-gallery-svg {
                                    height: 16px;
                                    width: 16px; } }
                            
                            .image-gallery-fullscreen-button {
                                right: 0; }
                            
                            .image-gallery-play-button {
                                left: 0; }
                            
                            .image-gallery-left-nav,
                            .image-gallery-right-nav {
                                padding: 50px 10px;
                                top: 50%;
                                transform: translateY(-50%); }
                                .image-gallery-left-nav .image-gallery-svg,
                                .image-gallery-right-nav .image-gallery-svg {
                                height: 120px;
                                width: 60px; }
                                @media (max-width: 768px) {
                                .image-gallery-left-nav .image-gallery-svg,
                                .image-gallery-right-nav .image-gallery-svg {
                                    height: 72px;
                                    width: 36px; } }
                                @media (max-width: 480px) {
                                .image-gallery-left-nav .image-gallery-svg,
                                .image-gallery-right-nav .image-gallery-svg {
                                    height: 48px;
                                    width: 24px; } }
                                .image-gallery-left-nav[disabled],
                                .image-gallery-right-nav[disabled] {
                                cursor: disabled;
                                opacity: .6;
                                pointer-events: none; }
                            
                            .image-gallery-left-nav {
                                left: 0; }
                            
                            .image-gallery-right-nav {
                                right: 0; }
                            
                            .image-gallery {
                                -webkit-user-select: none;
                                -moz-user-select: none;
                                -ms-user-select: none;
                                -o-user-select: none;
                                user-select: none;
                                -webkit-tap-highlight-color: transparent;
                                position: relative; }
                                .image-gallery.fullscreen-modal {
                                background: #000;
                                bottom: 0;
                                height: 100%;
                                left: 0;
                                position: fixed;
                                right: 0;
                                top: 0;
                                width: 100%;
                                z-index: 5; }
                                .image-gallery.fullscreen-modal .image-gallery-content {
                                    top: 50%;
                                    transform: translateY(-50%); }
                            
                            .image-gallery-content {
                                position: relative;
                                line-height: 0;
                                top: 0; }
                                .image-gallery-content.fullscreen {
                                background: #000; }
                                .image-gallery-content .image-gallery-slide .image-gallery-image {
                                max-height: calc(100vh - 80px); }
                                .image-gallery-content.left .image-gallery-slide .image-gallery-image, .image-gallery-content.right .image-gallery-slide .image-gallery-image {
                                max-height: 100vh; }
                            
                            .image-gallery-slide-wrapper {
                                position: relative; }
                                .image-gallery-slide-wrapper.left, .image-gallery-slide-wrapper.right {
                                display: inline-block;
                                width: calc(100% - 110px); }
                                @media (max-width: 768px) {
                                    .image-gallery-slide-wrapper.left, .image-gallery-slide-wrapper.right {
                                    width: calc(100% - 87px); } }
                                .image-gallery-slide-wrapper.image-gallery-rtl {
                                direction: rtl; }
                            
                            .image-gallery-slides {
                                line-height: 0;
                                overflow: hidden;
                                position: relative;
                                white-space: nowrap;
                                text-align: center; }
                            
                            .image-gallery-slide {
                                left: 0;
                                position: absolute;
                                top: 0;
                                width: 100%; }
                                .image-gallery-slide.center {
                                position: relative; }
                                .image-gallery-slide .image-gallery-image {
                                width: 100%;
                                object-fit: contain; }
                                .image-gallery-slide .image-gallery-description {
                                background: rgba(0, 0, 0, 0.4);
                                bottom: 70px;
                                color: #fff;
                                left: 0;
                                line-height: 1;
                                padding: 10px 20px;
                                position: absolute;
                                white-space: normal; }
                                @media (max-width: 768px) {
                                    .image-gallery-slide .image-gallery-description {
                                    bottom: 45px;
                                    font-size: .8em;
                                    padding: 8px 15px; } }
                            
                            .image-gallery-bullets {
                                bottom: 20px;
                                left: 0;
                                margin: 0 auto;
                                position: absolute;
                                right: 0;
                                width: 80%;
                                z-index: 4; }
                                .image-gallery-bullets .image-gallery-bullets-container {
                                margin: 0;
                                padding: 0;
                                text-align: center; }
                                .image-gallery-bullets .image-gallery-bullet {
                                appearance: none;
                                background-color: transparent;
                                border: 1px solid #fff;
                                border-radius: 50%;
                                box-shadow: 0 1px 0 #1a1a1a;
                                cursor: pointer;
                                display: inline-block;
                                margin: 0 5px;
                                outline: none;
                                padding: 5px;
                                transition: background .2s ease-out; }
                                @media (max-width: 768px) {
                                    .image-gallery-bullets .image-gallery-bullet {
                                    margin: 0 3px;
                                    padding: 3px; } }
                                @media (max-width: 480px) {
                                    .image-gallery-bullets .image-gallery-bullet {
                                    padding: 2.7px; } }
                                .image-gallery-bullets .image-gallery-bullet:focus, .image-gallery-bullets .image-gallery-bullet:hover {
                                    background: #337ab7;
                                    transform: scale(1.1); }
                                .image-gallery-bullets .image-gallery-bullet.active {
                                    background: #fff; }
                            
                            .image-gallery-thumbnails-wrapper {
                                position: relative; }
                                .image-gallery-thumbnails-wrapper.thumbnails-wrapper-rtl {
                                direction: rtl; }
                                .image-gallery-thumbnails-wrapper.left, .image-gallery-thumbnails-wrapper.right {
                                display: inline-block;
                                vertical-align: top;
                                width: 100px; }
                                @media (max-width: 768px) {
                                    .image-gallery-thumbnails-wrapper.left, .image-gallery-thumbnails-wrapper.right {
                                    width: 81px; } }
                                .image-gallery-thumbnails-wrapper.left .image-gallery-thumbnails, .image-gallery-thumbnails-wrapper.right .image-gallery-thumbnails {
                                    height: 100%;
                                    width: 100%;
                                    left: 0;
                                    padding: 0;
                                    position: absolute;
                                    top: 0; }
                                    .image-gallery-thumbnails-wrapper.left .image-gallery-thumbnails .image-gallery-thumbnail, .image-gallery-thumbnails-wrapper.right .image-gallery-thumbnails .image-gallery-thumbnail {
                                    display: block;
                                    margin-right: 0;
                                    padding: 0; }
                                    .image-gallery-thumbnails-wrapper.left .image-gallery-thumbnails .image-gallery-thumbnail + .image-gallery-thumbnail, .image-gallery-thumbnails-wrapper.right .image-gallery-thumbnails .image-gallery-thumbnail + .image-gallery-thumbnail {
                                        margin-left: 0;
                                        margin-top: 2px; }
                                .image-gallery-thumbnails-wrapper.left, .image-gallery-thumbnails-wrapper.right {
                                margin: 0 5px; }
                                @media (max-width: 768px) {
                                    .image-gallery-thumbnails-wrapper.left, .image-gallery-thumbnails-wrapper.right {
                                    margin: 0 3px; } }
                            
                            .image-gallery-thumbnails {
                                overflow: hidden;
                                padding: 5px 0; }
                                @media (max-width: 768px) {
                                .image-gallery-thumbnails {
                                    padding: 3px 0; } }
                                .image-gallery-thumbnails .image-gallery-thumbnails-container {
                                cursor: pointer;
                                text-align: center;
                                transition: transform .45s ease-out;
                                white-space: nowrap; }
                            
                            .image-gallery-thumbnail {
                                display: inline-block;
                                border: 4px solid transparent;
                                transition: border .3s ease-out;
                                width: 100px;
                                background: transparent;
                                padding: 0; }
                                @media (max-width: 768px) {
                                .image-gallery-thumbnail {
                                    border: 3px solid transparent;
                                    width: 81px; } }
                                .image-gallery-thumbnail + .image-gallery-thumbnail {
                                margin-left: 2px; }
                                .image-gallery-thumbnail .image-gallery-thumbnail-inner {
                                position: relative; }
                                .image-gallery-thumbnail .image-gallery-thumbnail-image {
                                vertical-align: middle;
                                width: 100%;
                                line-height: 0; }
                                .image-gallery-thumbnail.active, .image-gallery-thumbnail:hover, .image-gallery-thumbnail:focus {
                                outline: none;
                                border: 4px solid #337ab7; }
                                @media (max-width: 768px) {
                                    .image-gallery-thumbnail.active, .image-gallery-thumbnail:hover, .image-gallery-thumbnail:focus {
                                    border: 3px solid #337ab7; } }
                            
                            .image-gallery-thumbnail-label {
                                box-sizing: border-box;
                                color: white;
                                font-size: 1em;
                                left: 0;
                                line-height: 1em;
                                padding: 5%;
                                position: absolute;
                                top: 50%;
                                text-shadow: 1px 1px 0 black;
                                transform: translateY(-50%);
                                white-space: normal;
                                width: 100%; }
                                @media (max-width: 768px) {
                                .image-gallery-thumbnail-label {
                                    font-size: .8em;
                                    line-height: .8em; } }
                            
                            .image-gallery-index {
                                background: rgba(0, 0, 0, 0.4);
                                color: #fff;
                                line-height: 1;
                                padding: 10px 20px;
                                position: absolute;
                                right: 0;
                                top: 0;
                                z-index: 4; }
                                @media (max-width: 768px) {
                                .image-gallery-index {
                                    font-size: .8em;
                                    padding: 5px 10px; } }
                            
                            `}</style>
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
                            {data.Name}
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
                            {data.UnitPrice + "đ"}
                        </div>
                        <hr />
                        
                        <div className={styles['product-desc-medium']}>
                            <div dangerouslySetInnerHTML={{ __html: data.ShortDescription }} />
                        </div>

                        <hr />
                        {/* {this.renderDiscountInfos(discountInfo.discounts)} */}

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
                            className={styles['btn-addtocart']} onClick={console.log("Chon Mua")}>
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
                    <div className={styles['product-desc-medium']}>
                        <div dangerouslySetInnerHTML={{ __html: data.LongDescription }} />
                    </div>
                </Row>
            </MyLayout>
        )
    }
}

export async function getStaticPaths() {
    // Return a list of possible value for id
    const res = await axios.get(AppConstants.API_CMS_URL+"/prod-products")
    const arrNews = await res.data
    const paths = arrNews.map(n => {
        return {
        params: {
            id: n._id
        }
        }
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
    return {
        props: {
            data: newsData
        }
    }
}