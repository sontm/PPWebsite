import MyLayout from '../../components/layout';
import styles from './category.module.css';
import Link from 'next/link'
import dynamic from 'next/dynamic'

import Head from 'next/head'
import axios from "axios";
import React from 'react';

import { Row, Col, Radio, Button, Input, Select } from 'antd';
import Icon from '@ant-design/icons';
import Helpers from '../../util/Helpers'

import ProductWrapper from '../../components/ProductWrapper';
import AppConstants from '../../util/AppConstant';
const SideMenu = dynamic(() => import('../../components/SideMenu'))


const queryString = require('query-string');
const { Search } = Input;
const { Option } = Select;

export default function Category({ data, categories, curCateId, categoriesLevel, brands }) {
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
            <title>{data.Name}</title>
          </Head>
          
          <Row>
            <Col xs={0} sm={0} md={6} lg={5} xl={4} xxl={4}>
            <div className={styles['categorylist-sidemenu']}>
                <SideMenu categories={categories} curCateId={curCateId} 
                    categoriesLevel={categoriesLevel}/>
            </div>
            </Col>
            <Col xs={24} sm={24} md={18} lg={19} xl={20} xxl={20}>
                <Row type="flex">
                    {producView}
                </Row>
            </Col>
          </Row>
        </MyLayout>
      )
}

export async function getStaticPaths() {
    // Return a list of possible value for id
    const res = await axios.get(AppConstants.API_CMS_URL+"/prod-categories")
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
    console.log("--->Category: getStaticProps")
    console.log(params)
    // const res = await axios.get(AppConstants.API_CMS_URL+"/prod-categories/"+ params.id)
    // const cateData = await res.data

    const resProds = await axios.get(AppConstants.API_CMS_URL+"/prod-products/")
    const productDatas = await resProds.data

    let data = [];
    productDatas.forEach(element => {
        if (element.prod_category.id == params.id) {
            data.push(element)
        }
    });

    // Get List of Categories
    const resAllCate = await axios.get(AppConstants.API_CMS_URL+"/prod-categories")
    const categories = await resAllCate.data;
    const categoriesLevel = Helpers.levelingCategory(categories);

    const resAllBrand = await axios.get(AppConstants.API_CMS_URL+"/prod-brands")
    const brands = await resAllBrand.data;

    return {
        props: {
            data,
            categories,
            categoriesLevel,
            curCateId: params.id,
            brands
        }
    }
}

