import MyLayout from '../components/layout';
import styles from './hotdeal.module.css';
import Link from 'next/link'
import dynamic from 'next/dynamic'

import Head from 'next/head'
import axios from "axios";
import React from 'react';

import { Row, Col, Radio, Button, Input, Select } from 'antd';
import Icon from '@ant-design/icons';
import Helpers from '../util/Helpers'

import ProductWrapper from '../components/ProductWrapper';
import AppConstants from '../util/AppConstant';

const { Search } = Input;
const { Option } = Select;

export default function HotDeal({ data, categories, brands }) {
    let producView = [];
    if (data.length > 0) {
        data.forEach(element => {
            //ViewPort: xs <576px,sm	≥576px, md	≥768px, lg	≥992px, xl	≥1200px, xxl≥1600px
            producView.push(
                <Col xs={12} sm={12} md={12} lg={8} xl={6} xxl={6} key={element.id}>
                    <ProductWrapper singleProduct={element} categories={categories} brands={brands}/>
                </Col>)
        });
    }
    return (
        <MyLayout>
          <Head>
            <title>{"Hot Deals"}</title>
          </Head>
          
          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                <Row type="flex">
                    {producView}
                </Row>
            </Col>
          </Row>
        </MyLayout>
      )
}


export async function getStaticProps({ params }) {
    // Fetch necessary data for the blog post using params.id
    console.log("--->HotDeal: getStaticProps")
    console.log(params)

    

    // Get List of Categories
    const resAllCate = await axios.get(AppConstants.API_CMS_URL+"/prod-categories")
    const categories = await resAllCate.data;

    const resAllBrand = await axios.get(AppConstants.API_CMS_URL+"/prod-brands")
    const brands = await resAllBrand.data;

    const resProds = await axios.get(AppConstants.API_CMS_URL+"/prod-products/")
    let productDatas = await resProds.data
    let data = [];
    // Only add Product which is Parents: has some childs, no Parent
    productDatas.forEach(element => {
        let discountInfo = Helpers.parseDiscountInformation(element, categories, brands);
        element.discountPrice = discountInfo.discountPrice;
        if (element.discountPrice) {
            data.push(element);
        }
    });

    // Sort Large to Small
    data.sort((a,b) => (a.discountPrice < b.discountPrice) ? 1 : ((b.discountPrice < a.discountPrice) ? -1 : 0)); 

    return {
        props: {
            data,
            categories,
            brands
        }
    }
}

