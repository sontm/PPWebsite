import React, {Component} from 'react'
import { Layout, Menu, Dropdown, Input, Button } from 'antd';
import { Row, Col, Card } from 'antd';
import { Checkbox, Slider, InputNumber, Radio, Tooltip } from 'antd';
import Link from 'next/link'
import styles from './SideMenu.module.css';
import AppConstant, {CONFIG_PRICE_DIVIDED_RANGE, CONFIG_PRICE_ROUNDUP_TO, CONFIG_MAX_PRODUCT_PRICE} from '../util/AppConstant';
import {CloseCircleOutlined} from '@ant-design/icons';

const { Search } = Input;
const Sider = Layout.Sider;
const {SubMenu} = Menu;

//{ categories, categoriesLevel, curCateId }
class SideMenu extends Component {
    // getInitialProps({pathname, query}) {        
    //   return {custom: 'custom'}; // pass some custom props to component
    // }
    constructor(props) {
        super(props);

        this.onChangeBrand = this.onChangeBrand.bind(this);
        this.clearBrandQuery = this.clearBrandQuery.bind(this);

        this.onChangeBrandCountry = this.onChangeBrandCountry.bind(this);
        this.clearBrandQueryCountry = this.clearBrandQueryCountry.bind(this);

        this.onChangeAttribute = this.onChangeAttribute.bind(this);
        this.onChangePriceRangeRadio = this.onChangePriceRangeRadio.bind(this);
        this.onChangePriceRangeSliderFrom = this.onChangePriceRangeSliderFrom.bind(this);
        this.onChangePriceRangeSliderTo = this.onChangePriceRangeSliderTo.bind(this);
        this.onSubmitPriceRange = this.onSubmitPriceRange.bind(this);
        this.clearPriceRange = this.clearPriceRange.bind(this);
        this.clearAttributeQuery = this.clearAttributeQuery.bind(this);

        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.clearCategoryQuery =  this.clearCategoryQuery.bind(this);

        this.priceRangeQuery = [];
        this.state = {
            curPriceName: -1,
            curPriceFrom: 0,
            curPriceTo: CONFIG_MAX_PRODUCT_PRICE,
            curPriceSliderFrom: 0,
            curPriceSliderTo: 0,
            filterInfo: {
                brands: [],
                brandCountries:[],
                categories: [],
                attributes:[],
                attributesIds:[],
                priceRange:{}
            }
        }
        // filterInfo{
        //     brands:[], // list of brand ID, if empty mean All
        //     brandCountries:[], // list of ID
        //     categories: [], // List of ID
        //     attributes:[], // list of {Name: "MauSac", ID, Value: "Green"}
        //     priceRange:{} // {name: 1, from: m to:}; name is start from 1, just the Range in Query
        // };
    }

    renderCategoryMain() {
        //<Link href="/category/[id]" as={`/category/${topMenu.id}`}>
        // Type 1 of Category (Query Whole Category)
        if (this.props.categoriesLevel && this.props.curCateId) {
            
            const curID = this.props.curCateId;
            const selectedKeys = [];
            const openKeys = [];
            selectedKeys.push("" + curID)

            // From Whole Menu, here only Choose the Correct Category to Select, CANBE CUSTOMIZE
            let menuToDisplay = {};
            // First, find which part current Category is in
            // prop is "BanhKeo"
            for (var prop in this.props.categoriesLevel) {
                if (Object.prototype.hasOwnProperty.call(this.props.categoriesLevel, prop)) {
                    // curMenu is First High Level Menu
                    let curMenu = this.props.categoriesLevel["" +prop];
                    openKeys.push("" + curMenu.id);
                    if (curMenu.id == curID) {
                        // Selected Category is is First Menu
                        menuToDisplay[""+prop] = curMenu;
                        openKeys.push("" + curMenu.id);
                    } else {
                        for (var propSub in curMenu) {
                            if (Object.prototype.hasOwnProperty.call(curMenu, propSub)) {
                                if (propSub != "id") {
                                    let curSubMenu = curMenu[""+propSub];
                                    if (curSubMenu.id == curID) {
                                        // Selected Category is Second Menu
                                        menuToDisplay[""+prop] = curMenu;
                                        openKeys.push("" + curMenu.id);
                                        openKeys.push("" + curSubMenu.id);
                                    } else {
                                        // Search in all THird Menu
                                        if (curSubMenu.subs && curSubMenu.subs.length > 0) {
                                            curSubMenu.subs.forEach(element => {
                                                if (element.id == curID) {
                                                    // THis is Third Menu
                                                    menuToDisplay[""+prop] = curMenu;
                                                    openKeys.push("" + curMenu.id);
                                                    openKeys.push("" + curSubMenu.id);
                                                }
                                            });
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            // menuToDisplay
            // "BanhKeo":{
            //       "id": 1,
            //       "Banh":{id: 4, subs: [{id:8, name:"Banh1"}, {id:9, name:"Banh2"}]},
            //     },

            // --------CUSTOMIZE: COmment this to Display WHOLE LEVEL
            menuToDisplay = this.props.categoriesLevel;
            const subMenusFirst = [];
            if (menuToDisplay) {
                // propD is "BanhKeo"
                for (var propD in menuToDisplay) {
                    if (Object.prototype.hasOwnProperty.call(menuToDisplay, propD)) {
                        if (propD != "id") {
                            // curItem is
                            //{
                            //       "id": 1,
                            //       "Banh":{id: 4, subs: [{id:8, name:"Banh1"}, {id:9, name:"Banh2"}]},
                            //     },
                            //
                            const subMenusSecond = [];
                            let curItem = menuToDisplay[""+propD]
                            for (var propD2 in curItem) {
                                if (Object.prototype.hasOwnProperty.call(curItem, propD2)) {
                                    if (propD2 != "id") {
                                        const subMenuItems = [];
                                        // curMenuLvl is {id: 4, subs: [{id:8, name:"Banh1"}, {id:9, name:"Banh2"}]},
                                        let curMenuLvl = curItem[""+propD2];
                                        if (curMenuLvl.subs && curMenuLvl.subs.length > 0) {
                                            curMenuLvl.subs.forEach(element => {
                                                subMenuItems.push(
                                                    <Menu.Item key={element.id} 
                                                    className={element.id==curID ? styles['sidemenu-cate-selected'] : ""}>
                                                        <Link href="/category/[id]" as={`/category/${element.id}`}>
                                                        {element.name}
                                                        </Link>
                                                    </Menu.Item>
                                                );
                                            });
                                        }
                                        subMenusSecond.push(
                                            <SubMenu
                                            key={curMenuLvl.id}
                                            className={curMenuLvl.id==curID ? styles['sidemenu-cate-selected'] : ""}
                                            title={
                                                <Link href="/category/[id]" as={`/category/${curMenuLvl.id}`}>
                                                {propD2}
                                                </Link>
                                            }>
                                                {subMenuItems}
                                            </SubMenu>
                                        );
                                    }
                                }
                            }

                            subMenusFirst.push(
                                <SubMenu
                                key={curItem.id}
                                className={curItem.id==curID ? styles['sidemenu-cate-selected'] : ""}
                                title={
                                    <Link href="/category/[id]" as={`/category/${curItem.id}`}>
                                    {propD}
                                    </Link>
                                }>
                                {subMenusSecond}
                                </SubMenu>
                            );
                        }
                    }
                }

            }

            // this.props.category.categories.forEach((item, idx) => {
            //     subMenus.push(
            //         <Menu.Item key={item.id}>
            //             {item.name}
            //         </Menu.Item>)            
            //     });

            // TODO: Dont know why but set selectedKeys={["" + curID]} cannot OK
            // using defaultOpenKeys because if not, user cannot Open menu
            return (
                <div>
                    <div className={styles['ant-card ant-card-small']} style={{borderRight:"1px solid #e8e8e8"}}>
                    <div className={styles['ant-card-head app-card-head']}>
                        <div className={styles['ant-card-head-wrapper']}>
                            <div className={styles['ant-card-head-title']}>
                            Danh Muc San Pham
                            </div>
                        </div>
                    </div>
                    </div>
                    <Menu
                        selectedKeys={selectedKeys}
                        openKeys={openKeys}
                        mode="inline"
                        inlineIndent={20}
                        onClick={this.onSideMenuItemClick}
                        style={{borderTop:"1px solid #e8e8e8", paddingTop:"0px"}}
                    >
                        {subMenusFirst}
                    </Menu>
                </div>
            );
        } else {
            return null;
        }
    }

    renderBrandMain() {
        let content = [];
        if (this.props.brands && this.props.brands.length > 0 && this.props.curBrandId) {
            const selectedKeys = [];
            selectedKeys.push("" + this.props.curBrandId)

            this.props.brands.forEach(element => {
                content.push(
                    <SubMenu
                        key={element.id}
                        className={element.id==this.props.curBrandId ? styles['sidemenu-cate-selected'] : ""}
                        title={
                            <Link href="/brands/[id]" as={`/brands/${element.id}`}>
                            {element.Name}
                            </Link>
                        } />
                )   
            })
            return (
                <div>
                    <div className={styles['ant-card ant-card-small']} style={{borderRight:"1px solid #e8e8e8"}}>
                    <div className={styles['ant-card-head app-card-head']}>
                        <div className={styles['ant-card-head-wrapper']}>
                            <div className={styles['ant-card-head-title']}>
                            Danh Muc Thuong Hieu
                            </div>
                        </div>
                    </div>
                    </div>
                    <Menu
                        selectedKeys={selectedKeys}
                        mode="inline"
                        inlineIndent={20}
                        onClick={this.onSideMenuItemClick}
                        style={{borderTop:"1px solid #e8e8e8", paddingTop:"0px"}}
                    >
                        {content}
                    </Menu>
                </div>
            )
        } else {
            return null;
        }
    }

    //------------------------------------------------------------------------------
    onChangeBrand(id, name) {
        console.log("BrandID:" + name + ":" + id);
        let oldFilterBrands = [...this.state.filterInfo.brands];
        
        if (oldFilterBrands.indexOf(id) < 0) {
            // Include Brand
            oldFilterBrands.push(id);
        } else {
            oldFilterBrands.splice(oldFilterBrands.indexOf(id), 1);
        }
        let newFilterInfo = {...this.state.filterInfo, brands: oldFilterBrands};
        this.setState({
            filterInfo: newFilterInfo
        })
        console.log(newFilterInfo)

        this.props.onFilterProduct(newFilterInfo)
    }
    clearBrandQuery() {
        // name -1 mean Clear
        let newFilterInfo = {...this.state.filterInfo, brands: []};
        this.setState({
            filterInfo: newFilterInfo
        })
        this.props.onFilterProduct(newFilterInfo)
    }

    onChangeBrandCountry(id, name) {
        console.log("CountryBrandID:" + name + ":" + id);
        let oldFilterBrands = [...this.state.filterInfo.brandCountries];
        
        if (oldFilterBrands.indexOf(id) < 0) {
            // Include Brand
            oldFilterBrands.push(id);
        } else {
            oldFilterBrands.splice(oldFilterBrands.indexOf(id), 1);
        }
        let newFilterInfo = {...this.state.filterInfo, brandCountries: oldFilterBrands};
        this.setState({
            filterInfo: newFilterInfo
        })
        console.log(newFilterInfo)

        this.props.onFilterProduct(newFilterInfo)
    }
    clearBrandQueryCountry() {
        // name -1 mean Clear
        let newFilterInfo = {...this.state.filterInfo, brandCountries: []};
        this.setState({
            filterInfo: newFilterInfo
        })
        this.props.onFilterProduct(newFilterInfo)
    }
    renderFilterBrand() {
        // filter Brands of current data Product
        let brandNameList=[];
        let brandIds = [];
        let brandProductCount = {};

        let brandCountryList=[];
        let brandCountryIds=[];
        let brandCountryAll = {};
        let brandCountryCount = {};
        // only display when in Main Category Page
        if (this.props.curCateId && this.props.countries && this.props.countries.length) {
            this.props.countries.forEach(element => {
                if (!brandCountryAll[""+element.id]) {
                    brandCountryAll[""+element.id] = element;
                }
            })
        }

        if (this.props.curCateId && this.props.data && this.props.data.length) {
            this.props.data.forEach(element => {
                if (brandIds.indexOf(element.prod_brand.id) < 0) {
                    // Not Exist, this is new brand
                    brandIds.push(element.prod_brand.id)
                    brandNameList.push(element.prod_brand);
                    if (brandProductCount[""+element.prod_brand.id]) {
                        brandProductCount[""+element.prod_brand.id]++;
                    } else{
                        brandProductCount[""+element.prod_brand.id] = 1;
                    }
                }

                if (brandCountryIds.indexOf(element.prod_brand.prod_country) < 0) {
                    // Not Exist, new Country
                    brandCountryIds.push(element.prod_brand.prod_country);

                    brandCountryList.push(brandCountryAll[""+element.prod_brand.prod_country]);

                    if (brandCountryCount[""+element.prod_brand.prod_country]) {
                        brandCountryCount[""+element.prod_brand.prod_country]++;
                    } else{
                        brandCountryCount[""+element.prod_brand.prod_country] = 1;
                    }
                }
            })
        }
        if ( brandNameList.length > 0) {
            const content = [];
            brandNameList.forEach(element => {
                content.push(
                    <React.Fragment key={element.id}>
                    <Checkbox
                        key={element.id}
                        name={element.Name}
                        onChange={() => this.onChangeBrand(element.id, element.Name)}
                        checked={(this.state.filterInfo.brands.length > 0 && 
                            this.state.filterInfo.brands.indexOf((""+element.id)) >= 0)}
                    >
                        {element.Name + 
                            "(" + brandProductCount[""+element.id] + ")"}
                    </Checkbox>
                    <br />
                    </React.Fragment>
                )   
            })

            const contentBrandCountry = [];
            brandCountryList.forEach(element => {
                contentBrandCountry.push(
                    <React.Fragment key={element.id}>
                    <Checkbox
                        key={element.id}
                        name={element.Name}
                        onChange={() => this.onChangeBrandCountry(element.id, element.Name)}
                        checked={(this.state.filterInfo.brandCountries.length > 0 && 
                            this.state.filterInfo.brandCountries.indexOf((""+element.id)) >= 0)}
                    >
                        {element.Name + 
                            "(" + brandCountryCount[""+element.id] + ")"}
                    </Checkbox>
                    <br />
                    </React.Fragment>
                )   
            })

            return (
                <React.Fragment key={'brand-country'}>
                <Card size="small" title="Thuong Hieu" style={{marginTop: "10px"}}
                extra={<Tooltip title="Xoá Lọc"><Button type="primary"  size="small" 
                    onClick={this.clearBrandQuery}
                    >
                    <CloseCircleOutlined style={{fontSize:"12px", color:"white"}}/>
                    Clear
                </Button></Tooltip>}>
                    {content}
                </Card>

                <Card size="small" title="Xua Xu Thuong Hieu" style={{marginTop: "10px"}}
                extra={<Tooltip title="Xoá Lọc"><Button type="primary"  size="small" 
                    onClick={this.clearBrandQueryCountry}
                    >
                    <CloseCircleOutlined style={{fontSize:"12px", color:"white"}}/>
                    Clear
                </Button></Tooltip>}>
                    {contentBrandCountry}
                </Card>
                </React.Fragment>
            )
        } else {
            return null;
        }
    }



    onChangeCategory(id, name) {
        console.log("CategoryID:" + name + ":" + id);
        let oldData = [...this.state.filterInfo.categories];
        
        if (oldData.indexOf(id) < 0) {
            // Include Brand
            oldData.push(id);
        } else {
            oldData.splice(oldData.indexOf(id), 1);
        }
        let newFilterInfo = {...this.state.filterInfo, categories: oldData};
        this.setState({
            filterInfo: newFilterInfo
        })
        console.log(newFilterInfo)

        this.props.onFilterProduct(newFilterInfo)
    }
    clearCategoryQuery() {
        // name -1 mean Clear
        let newFilterInfo = {...this.state.filterInfo, categories: []};
        this.setState({
            filterInfo: newFilterInfo
        })
        this.props.onFilterProduct(newFilterInfo)
    }
    renderFilterCategory() {
        // filter Brands of current data Product
        let categoryNameList=[];
        let categoryIds = [];
        let categoryProductCount = {};

        // only display when in Main Brand Page
        if (this.props.curBrandId && this.props.data && this.props.data.length) {
            this.props.data.forEach(element => {
                if (categoryIds.indexOf(element.prod_category.id) < 0) {
                    // Not Exist, this is new brand
                    categoryIds.push(element.prod_category.id)
                    categoryNameList.push(element.prod_category);
                    if (categoryProductCount[""+element.prod_category.id]) {
                        categoryProductCount[""+element.prod_category.id]++;
                    } else{
                        categoryProductCount[""+element.prod_category.id] = 1;
                    }
                }
            })
        }
        if ( categoryNameList.length > 0) {
            const content = [];
            categoryNameList.forEach(element => {
                content.push(
                    <React.Fragment key={element.id}>
                    <Checkbox
                        key={element.id}
                        name={element.Name}
                        onChange={() => this.onChangeCategory(element.id, element.Name)}
                        checked={(this.state.filterInfo.categories.length > 0 && 
                            this.state.filterInfo.categories.indexOf((""+element.id)) >= 0)}
                    >
                        {element.Name + 
                            "(" + categoryProductCount[""+element.id] + ")"}
                    </Checkbox>
                    <br />
                    </React.Fragment>
                )   
            })

            return (
                <Card size="small" title="Danh Muc" style={{marginTop: "10px"}}
                extra={<Tooltip title="Xoá Lọc"><Button type="primary"  size="small" 
                    onClick={this.clearCategoryQuery}
                    >
                    <CloseCircleOutlined style={{fontSize:"12px", color:"white"}}/>
                    Clear
                </Button></Tooltip>}>
                    {content}
                </Card>
            )
        } else {
            return null;
        }
    }




    //list of {Name: "MauSac", id}
    onChangeAttribute(id, name, value) {
        console.log("Attribute ID:" + name + ":" + id);
        let oldFilter = [...this.state.filterInfo.attributes];
        let attributesIds = [...this.state.filterInfo.attributesIds];
        let isExist = false;
        let indexOfExist = -1;
        for (let i = 0; i < oldFilter.length; i++) {
            if (oldFilter[i].id == id) {
                isExist = true;
                indexOfExist = i;
                break;
            }
        }
        if (!isExist) {
            oldFilter.push({id, Name: name, Value: value});
            attributesIds.push(id);
        } else {
            oldFilter.splice(indexOfExist, 1);
            attributesIds.splice(indexOfExist, 1);
        }
        let newFilterInfo = {...this.state.filterInfo, attributes: oldFilter, attributesIds};
        this.setState({
            filterInfo: newFilterInfo
        })
        console.log(newFilterInfo)

        this.props.onFilterProduct(newFilterInfo)
    }
    // name is MauSac 
    clearAttributeQuery(name) {
        console.log("Clear Attribute ID:" + name);
        let oldFilter = [...this.state.filterInfo.attributes];
        let attributesIds = [...this.state.filterInfo.attributesIds];
        for (let i = oldFilter.length-1; i >= 0; i--) {
            if (oldFilter[i].Name == name) {
                // Remove this Ids. NOTE: REMOVE before oldFilter.splice
                if (attributesIds && attributesIds.length) {
                    attributesIds.splice(attributesIds.indexOf(oldFilter[i].id), 1);
                }

                // Remove this Attribute Filter
                oldFilter.splice(i, 1);
                
            }
        }

        let newFilterInfo = {...this.state.filterInfo, attributes: oldFilter, attributesIds};
        this.setState({
            filterInfo: newFilterInfo
        })
        console.log(newFilterInfo)

        this.props.onFilterProduct(newFilterInfo)
    }
    renderFilterAttributes() {
        //Parse to output
        // {
        //     "MauSac": [
        //             {Name: MauSac, Value: Xanh, id:2, count: 5},
        //             {Name: MauSac, Value: Do, id:3, count: 6}
        //         ]
        //     }
        // }
        let attributes = {};
        let attributesCount = {}; // {id: count}
        if (this.props.data && this.props.data.length) {
            this.props.data.forEach(element => {
                // Input prod_attributes
                // "Name": "Color",
                // "Value": "White",
                // id:
                element.prod_attributes.forEach(att => {
                    if (!attributes[""+att.Name]) {
                        attributes[""+att.Name] = [
                            {'Name': att.Name,'Value': att.Value, "id": att.id}]
                    } else {
                        attributes[""+att.Name].push({'Name': att.Name,'Value': att.Value, "id": att.id})
                    }
    
                    if (attributesCount[""+att.id]) {
                        attributesCount[""+att.id]++;
                    } else {
                        attributesCount[""+att.id] = 1;
                    }
                })
                
            })
        }
        if (Object.keys(attributes).length) {
            let content = [];

            for (var prop in attributes) {
                if (Object.prototype.hasOwnProperty.call(attributes, prop)) {
                    let AttName = prop;
                    var attribute = attributes[""+prop];
                    let subValue = [];
                    attribute.forEach(element => {
                        subValue.push(
                            <React.Fragment key={element.id}>
                            <Checkbox
                                key={element.id}
                                name={""+element.Name}
                                onChange={() => this.onChangeAttribute(element.id, element.Name, element.Value)}
                                checked={(this.state.filterInfo.attributesIds.length > 0 && 
                                    this.state.filterInfo.attributesIds.indexOf((""+element.id)) >= 0)}
                            >
                                {element.Value+"(" + attributesCount[""+element.id] + ")"}
                            </Checkbox>
                            <br />
                            </React.Fragment>
                        )
                    })
                    content.push(
                        <Card size="small" title={prop} style={{marginTop: "10px"}} key={prop}
                        extra={<Tooltip title="Xoá Lọc"><Button type="primary"  size="small" key={prop}
                            onClick={() => this.clearAttributeQuery(AttName)}
                        >
                            <CloseCircleOutlined style={{fontSize:"12px", color:"white"}}/>
                            Clear
                        </Button></Tooltip>}>
                            {subValue}
                        </Card>
                    )
                }
            }
            return content;
        } else {
            return null;
        }
    }




    renderFilterPriceRange() {
        let priceRangeQuery = [];

        if (this.props.data && this.props.data.length) {
            let COUNT_EACH_RANGE = Math.floor(this.props.data.length/CONFIG_PRICE_DIVIDED_RANGE);
            if (COUNT_EACH_RANGE == 0) {
                COUNT_EACH_RANGE = 1;
            }
            let countP = -1
            let countRange = 1;
            // Sort Products by LowPrice First

            let productSorted = [...this.props.data];
            productSorted.sort((a, b) =>
                (a.UnitPrice > b.UnitPrice) ? 1 : -1
            );

            let prevPriceRange = 0;
            let curPriceRange = 0;

            productSorted.forEach(element => {
                if (countP == -1) {
                    // Always 0 for First Range
                    //prevPriceRange = this.getFinalPriceOfProduct(p);
                    prevPriceRange = 0;
                    countP = 0;
                }
                countP++;
                if (countP >= COUNT_EACH_RANGE) {
                    // Finish a Range, get this price Round Up to 50K
                    curPriceRange = element.UnitPrice;
                    let roundDivider = Math.ceil(curPriceRange/CONFIG_PRICE_ROUNDUP_TO); // 50K
                    curPriceRange = roundDivider * CONFIG_PRICE_ROUNDUP_TO;
                    if (prevPriceRange != curPriceRange) {
                        priceRangeQuery.push({name:countRange, from: prevPriceRange, to: curPriceRange})
                        prevPriceRange = curPriceRange;
                    }
                    countRange++;
                    countP = 0;
                }
            })
        }

        let radioViews = [];
        let sliderFromMin = 0;
        let sliderFromMax = CONFIG_MAX_PRODUCT_PRICE;
        let sliderToMin = 0;
        let sliderToMax = CONFIG_MAX_PRODUCT_PRICE;
        // Whole Slider should have 20 Range Steps only
        let sliderFromStep = 10000; // Default Step is 10000
        let sliderToStep = 10000;

        // Set priceRangeQuery current---------------------------------
        this.priceRangeQuery = priceRangeQuery;

        if (priceRangeQuery.length > 0) {
            priceRangeQuery.forEach((item, index) => {
                if (index == 0) {
                    sliderFromMin = item.from;
                    sliderToMin = item.from;
                } else if(index == priceRangeQuery.length-1) {
                    sliderFromMax = item.to;
                    sliderToMax = item.to;
                }

                radioViews.push(
                    <Radio value={item.name} key={index}>
                        {item.from + "-" + item.to}
                    </Radio>
                )
            })

            sliderFromStep = Math.floor((sliderFromMax - sliderFromMin) / 20);
            sliderToStep = Math.floor((sliderToMax - sliderToMin) / 20);
        }
        return (
            <Card size="small" title="Gia" style={{marginTop: "10px"}} 
            extra={<Tooltip title="Xoá Lọc"><Button type="primary"  size="small" onClick={this.clearPriceRange}>
                    <CloseCircleOutlined style={{fontSize:"12px", color:"white"}}/>
                    Clear
            </Button></Tooltip>}>
                <Radio.Group 
                  onChange={this.onChangePriceRangeRadio} value={this.state.curPriceName}
                >
                    {radioViews}
                </Radio.Group>
                <br />
                <Row>
                    <Col span={8}>
                        <hr style={{marginTop: "12px"}}/>
                    </Col>
                    <Col span={8}>
                        <div style={{textAlign:"center"}}>
                        <span style={{display:"inline-block", fontWeight:"bold"}}>Hoặc</span>
                        </div>
                    </Col>
                    <Col span={8}>
                        <hr style={{marginTop: "12px"}}/>
                    </Col>
                </Row>

                
                <Row>
                    <Col span={8}>
                        <span style={{display: "inline-block", verticalAlign: "middle"}}>
                        From (đ):
                        </span>
                    </Col>
                    <Col span={16}>
                        <InputNumber
                            min={sliderFromMin}
                            max={sliderFromMax}
                            step={sliderFromStep}
                            style={{ width: "100%"}}
                            value={this.state.curPriceSliderFrom}
                            onChange={this.onChangePriceRangeSliderFrom}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={2}>
                    </Col>
                    <Col span={22}>
                        <Slider
                            min={sliderFromMin}
                            max={sliderFromMax}
                            step={sliderFromStep}
                            onChange={this.onChangePriceRangeSliderFrom}
                            value={typeof this.state.curPriceSliderFrom === 'number' ? 
                                this.state.curPriceSliderFrom : 0}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={6}>
                    </Col>
                    <Col span={18}>
                    <hr></hr>
                    </Col>
                </Row>
               
                <Row>
                    <Col span={8}>
                        <span style={{display: "inline-block", verticalAlign: "middle"}}>
                        To (đ):
                        </span>
                    </Col>
                    <Col span={16}>
                        <InputNumber
                            min={sliderToMin}
                            max={sliderToMax}
                            step={sliderToStep}
                            style={{ width: "100%"}}
                            value={(this.state.curPriceSliderTo)}
                            onChange={this.onChangePriceRangeSliderTo}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={2}>
                    </Col>
                    <Col span={22}>
                        <Slider
                            min={sliderToMin}
                            max={sliderToMax}
                            step={sliderToStep}
                            onChange={this.onChangePriceRangeSliderTo}
                            value={typeof this.state.curPriceSliderTo === 'number' ? 
                            (this.state.curPriceSliderTo ) : 0}
                        />
                    </Col>
                </Row>
                <div style={{textAlign:"center"}}>
                    <Button type="primary" onClick={this.onSubmitPriceRange}>Tìm Kiếm</Button>
                </div>
            </Card>
        )
    }



    render() {
        const { categories,brands,curCateId,categoriesLevel,data, curBrandId, countries } = this.props;
        console.log("--->SideMenu: render")
        return (
            <div>
                {this.renderCategoryMain()}
                {this.renderBrandMain()}

                {this.renderFilterBrand()}
                {this.renderFilterCategory()}
                {this.renderFilterPriceRange()}
                {this.renderFilterAttributes()}
                
            </div>
        )
    }



    onSubmitPriceRange() {
        console.log("onSubmitPriceRange......")
        //curPriceName=-1 mean is using Slider
        console.log(this.state)
        let from = 0;
        let to = 0;
        if (this.state.curPriceName >= 0) {
            // using value from radio
            from = this.state.curPriceFrom;
            to = this.state.curPriceTo;
        } else {
            from = this.state.curPriceSliderFrom;
            to = this.state.curPriceSliderTo;
        }
        if (to >= from && to > 0) {
            // ONly query when To > From
            let newFilterInfo = {...this.state.filterInfo, priceRange: {from, to}};
            this.setState({
                filterInfo: newFilterInfo
            })
            console.log(newFilterInfo)
            this.props.onFilterProduct(newFilterInfo)
        }
        
    }
    onChangePriceRangeRadio(e) {
        console.log("onChangePriceRangeRadio:" + e.target.value)

        // Found the name in propsPriceRangeQuery
        if (this.priceRangeQuery.length > 0) {
            this.priceRangeQuery.forEach(item => {
                if (item.name == e.target.value) {
                    this.setState({
                        curPriceName:e.target.value,
                        curPriceFrom: item.from,
                        curPriceTo: item.to,
                        curPriceSliderFrom: 0,
                        curPriceSliderTo: 0
                    })
                    if (item.to >= item.from && item.to > 0) {
                        // ONly query when To > From

                        let newFilterInfo = {...this.state.filterInfo, priceRange: {from: item.from, to: item.to}};
                        this.setState({
                            filterInfo: newFilterInfo
                        })
                        console.log(newFilterInfo)

                        this.props.onFilterProduct(newFilterInfo)
                    }
                }
            })
        }
        
    }
    onChangePriceRangeSliderFrom(value) {
        this.setState({
            curPriceSliderFrom: value,
            curPriceName: -1,
            curPriceFrom: 0,
            curPriceTo: CONFIG_MAX_PRODUCT_PRICE,
        })
    }
    onChangePriceRangeSliderTo(value) {
        this.setState({
            curPriceSliderTo: value,
            curPriceName: -1,
            curPriceFrom: 0,
            curPriceTo: CONFIG_MAX_PRODUCT_PRICE,
        })
    }
    clearPriceRange() {
        this.setState({
            curPriceName: -1,
            curPriceFrom: 0,
            curPriceTo: CONFIG_MAX_PRODUCT_PRICE,
            curPriceSliderFrom: 0,
            curPriceSliderTo: 0
        })
        let newFilterInfo = {...this.state.filterInfo, priceRange: {from: 0, to: CONFIG_MAX_PRODUCT_PRICE}};
        this.setState({
            filterInfo: newFilterInfo
        })
        console.log(newFilterInfo)
        this.props.onFilterProduct(newFilterInfo)
    }
}

export default SideMenu;