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
        this.onSortingProducts = this.onSortingProducts.bind(this);
        
        this.onChangeSearchFilter = this.onChangeSearchFilter.bind(this);

        this.state = {
            displayProducts: [], // INITIAL value is NULL, means display All
            sortedProducts: [],
            filterBar: "popular",
            searchTerm: ""
        }
    }

    // filterInfo{
    //     brands:[], // list of brand ID, if empty mean All
    //     brandCountries:[], // list of ID
    //     attributes:[], list of {Name: "MauSac", ID, Value: "Green"},
    //     priceRange:{} // {from:, to:}; name is start from 1, just the Range in Query
    // };
    onFilterProduct(filterInfo) {
        console.log("onFIlterProduct###################")
        console.log(filterInfo)

        // Filter Products with Brands, Attribute
        let displayProducts = Helpers.getFilteredProduct(this.props.data, filterInfo);
        this.setState({
            displayProducts
        });
    }

    onSortingProducts (filterBar) {
        console.log(' Sorting Name:' +filterBar);
        let dataToDisplay = (this.state.displayProducts && this.state.displayProducts.length) ? this.state.displayProducts : this.props.data;
        let sortedProducts = Helpers.sortProduct(filterBar, this.state.searchTerm, dataToDisplay);
        console.log(sortedProducts)
        this.setState({
            filterBar,
            sortedProducts,
        });
    };

    // If support Search when typing, use this
    onChangeSearchFilter(e) {
        let searchTerm = e.target.value
        //if (e.target.value=="" || e.target.value.length <= 0) {
        if(this.timeout) {
            // When duing 500ms, User typing new character, stop timeout, no need to search
            clearTimeout(this.timeout);
        }
        this.timeout = setTimeout(() => {
            let dataToDisplay = (this.state.displayProducts && this.state.displayProducts.length) ? this.state.displayProducts : this.props.data;
            let sortedProducts = Helpers.sortProduct(this.state.filterBar, searchTerm, dataToDisplay);
            this.setState({
                searchTerm,
                sortedProducts,
            });
        },500);
    }

    renderFilterBar() {
        return (
            <div className={styles['product-filter']}>
                <Row>
                <Col xs={0} sm={0} md={0} lg={24} xl={16} xxl={16}>
                    <span className={styles['filter-option']}>Sắp Xếp:</span>
                    <Button type={this.state.filterBar=="popular" ? "danger" : "dashed"} size="large" 
                        className={styles['filter-option']}
                            name="popular" onClick={() => this.onSortingProducts("popular")}>
                        Bán Chạy
                    </Button>
                    <Button type={this.state.filterBar=="new" ? "danger" : "dashed"} size="large" 
                        className={styles['filter-option']}
                            name="new" onClick={() => this.onSortingProducts("new")}>
                        Hàng Mới
                    </Button>
                    <Button type={this.state.filterBar=="discount" ? "danger" : "dashed"} size="large"
                    className={styles['filter-option']}
                            name="discount" onClick={() => this.onSortingProducts("discount")}>
                        Giảm Giá
                    </Button>
                    <Button type={this.state.filterBar=="lowprice" ? "danger" : "dashed"} size="large" 
                    className={styles['filter-option']}
                            name="lowprice" onClick={() => this.onSortingProducts("lowprice")}>
                        Giá Thấp
                    </Button>
                    <Button type={this.state.filterBar=="highprice" ? "danger" : "dashed"} size="large" 
                    className={styles['filter-option']}
                            name="highprice" onClick={() => this.onSortingProducts("highprice")}>
                        Giá Cao
                    </Button>
                </Col>
                {/* {For Mobile UI} */}
                <Col xs={24} sm={24} md={24} lg={0} xl={0} xxl={0}>
                    <Row>
                    <Col xs={8} sm={6} span={6}>
                    <span className={styles['filter-option']}>Sắp Xếp:</span>
                    </Col>
                    <Col xs={16} sm={18} span={18}>
                    <Select defaultValue="popular" style={{width: "100%"}}>
                        <Option value="popular">Bán Chạy</Option>
                        <Option value="new">Hàng Mới</Option>
                        <Option value="discount">Giảm Giá</Option>
                        <Option value="lowprice">Giá Thấp</Option>
                        <Option value="highprice">Giá Cao</Option>
                    </Select>
                    </Col>
                    </Row>
                </Col>
                <Col xs={0} sm={0} md={0} lg={0} xl={8} xxl={8}>
                    <Search
                        placeholder="Search product"
                        enterButton
                        size="large"
                        // onSearch={value => this.onSearchFilter(value)}
                        onChange={e => this.onChangeSearchFilter(e)}
                    />
                </Col>
                </Row>
            </div>
        );
    }

    render() {
        const { data, categories, curCateId, categoriesLevel, brands, countries } = this.props;
        let producView = [];

        // CHeck if Filtered
        let dataToDisplay = (this.state.displayProducts && this.state.displayProducts.length) ? this.state.displayProducts : data;
        // Check if is Sorting
        if (this.state.searchTerm != "" || this.state.filterBar != "popular") {
            dataToDisplay = (this.state.sortedProducts&&this.state.sortedProducts.length) ? this.state.sortedProducts : dataToDisplay;
        }
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
                <Col xs={0} sm={0} md={6} lg={5} xl={5} xxl={5}>
                <div className={styles['categorylist-sidemenu']}>
                    <SideMenu categories={categories} brands={brands} curCateId={curCateId} 
                        categoriesLevel={categoriesLevel} data={data} countries={countries}
                        onFilterProduct={this.onFilterProduct} />
                </div>
                </Col>
                <Col xs={24} sm={24} md={18} lg={19} xl={19} xxl={19}>
                    {this.renderFilterBar()}
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

