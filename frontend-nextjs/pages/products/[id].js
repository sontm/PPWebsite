import MyLayout from '../../components/layout';
import styles from './product.module.css';
import Link from 'next/link'

import Head from 'next/head'
import axios from "axios";
import React, {useEffect} from 'react';
import dynamic from 'next/dynamic'

import { Card, Row, Col, Button, Input } from 'antd';
import {HeartOutlined, PhoneOutlined, MailOutlined} from '@ant-design/icons';

export default function Product({ data }) {
    let discountInfo= {newPrice: data.UnitPrice};
    return (
        <MyLayout>
          <Head>
            <title>{data.Name}</title>
          </Head>
          {/* <div dangerouslySetInnerHTML={{ __html: data.LongDescription }} /> */}

            <Row className={styles['product-detail']}>
                <Col xs={24} sm={24} md={24} lg={3} xl={2} xxl={2} key={"imglist"}>
                Image galerry
                </Col>
                <Col xs={0} sm={0} md={0} lg={9} xl={8} xxl={8} >
                    Image 
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
                <Col xs={0} sm={0} md={0} lg={0} xl={4} xxl={4} >
                    <Card size="small" title="Liên Hệ">
                        <p><PhoneOutlined style={{fontSize: "20px"}} /> Hotline đặt hàng:
                        <br/>
                        <a href="tel:18006963">
                        18006963
                        </a></p>
                        <p> <MailOutlined style={{fontSize: "20px"}} /> Email: 
                        <br/>
                        <a href="mailto:hotro@phuphuong.vn?Subject=DatHang" target="_top">
                        hotro@phuphuong.vn
                        </a></p>
                    </Card>
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

export async function getStaticPaths() {
    // Return a list of possible value for id
    const res = await axios.get(process.env.API_URL+"/prod-products")
    const arrNews = await res.data
    const paths = arrNews.map(n => {
        return {
        params: {
            id: n._id
        }
        }
    })
    console.log("paths-----------------------------")
    console.log(paths)
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    // Fetch necessary data for the blog post using params.id
    console.log("Params---------------------------------")
    console.log(params)
    const res = await axios.get(process.env.API_URL+"/prod-products/"+ params.id)
    const newsData = await res.data
    return {
        props: {
            data: newsData
        }
    }
}