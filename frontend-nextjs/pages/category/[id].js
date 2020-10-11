import MyLayout from '../../components/layout';
import styles from './category.module.css';
import Link from 'next/link'
import dynamic from 'next/dynamic'

import Head from 'next/head'
import axios from "axios";
import React from 'react';

import { Row, Col, Radio, Button, Input, Select } from 'antd';
import Helpers from '../../util/Helpers'

import ProductWrapper from '../../components/ProductWrapper';
import AppConstants from '../../util/AppConstant';
const SideMenu = dynamic(() => import('../../components/SideMenu'))


const queryString = require('query-string');
const { Search } = Input;
const { Option } = Select;


class Category extends React.Component {
    constructor(props) {
        super(props);

        this.onFilterProduct = this.onFilterProduct.bind(this);

        this.state = {
            displayProducts: null, // INITIAL value is NULL, means display All
        }
    }

    // filterInfo{
    //     brands:[], // list of brand ID, if empty mean All
    //     brandCountries:[], // list of ID
    //     attributes:[], // list of ID,
    //     priceRange:{} // {name: 1, from: m to:}; name is start from 1, just the Range in Query
    // };
    onFilterProduct(filterInfo) {
        console.log("onFIlterProduct###################")
        console.log(filterInfo)

        // Filter Products with Brands, Attribute
        let displayProducts = [];
        this.props.data.forEach(element => {
            // if Filter Brand, only add element of that Brand
            if (!filterInfo.brands.length || // if No Selected, means all
                    (filterInfo.brands.length > 0 && filterInfo.brands.indexOf(element.prod_brand.id) >= 0)) {
                // This product have category same as Filtering

                // Check another Filter criteria: Brand Country
                if (!filterInfo.brandCountries.length || // if No Selected, means all
                    (filterInfo.brandCountries.length > 0 && filterInfo.brandCountries.indexOf(element.prod_brand.prod_country) >= 0)) {

                    for (let i = 0; i < element.prod_attributes.length; i++) {
                        let curId = element.prod_attributes[i].id;
                        // Check another Filter criteria: Attribute
                        if (!filterInfo.attributes.length || // if No Selected, means all 
                            (filterInfo.attributes.length > 0 && filterInfo.attributes.indexOf(curId) >= 0)) {
                                displayProducts.push(element)
                                break;
                        }
                    }

                }
            }
            
        })
        this.setState({
            displayProducts
        });
    }

    render() {
        const { data, categories, curCateId, categoriesLevel, brands, countries } = this.props;
        let producView = [];
        let dataToDisplay = this.state.displayProducts ? this.state.displayProducts : data;
        if (dataToDisplay.length > 0) {
            dataToDisplay.forEach(element => {
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
                <title>{"Cateogry TODO"}</title>
            </Head>
            
            <Row>
                <Col xs={0} sm={0} md={6} lg={5} xl={4} xxl={4}>
                <div className={styles['categorylist-sidemenu']}>
                    <SideMenu categories={categories} brands={brands} curCateId={curCateId} 
                        categoriesLevel={categoriesLevel} data={data} countries={countries}
                        onFilterProduct={this.onFilterProduct} />
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
}

export default Category;

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
    // Only add Product which is Parents: has some childs, no Parent
    productDatas.forEach(element => {
        if (element.prod_category.id == params.id && !element.prod_parent) {
            data.push(element)
        }
    });

    // Get List of Categories
    const resAllCate = await axios.get(AppConstants.API_CMS_URL+"/prod-categories")
    const categories = await resAllCate.data;
    const categoriesLevel = Helpers.levelingCategory(categories);

    const resAllBrand = await axios.get(AppConstants.API_CMS_URL+"/prod-brands")
    const brands = await resAllBrand.data;

    const resAllCountries = await axios.get(AppConstants.API_CMS_URL+"/prod-countries")
    const countries = await resAllCountries.data;

    return {
        props: {
            data,
            categories,
            categoriesLevel,
            curCateId: params.id,
            brands,
            countries
        }
    }
}

