import React, {Component} from 'react'
import { Layout, Menu, Dropdown, Input, Button } from 'antd';
import { Row, Col, Card } from 'antd';
import { Checkbox, Slider, InputNumber, Radio, Tooltip } from 'antd';
import Link from 'next/link'
import styles from './PostSideMenu.module.css';
import AppConstant, {CONFIG_PRICE_DIVIDED_RANGE, CONFIG_PRICE_ROUNDUP_TO, CONFIG_MAX_PRODUCT_PRICE} from '../util/AppConstant';
import {CloseCircleOutlined} from '@ant-design/icons';
import { Typography } from 'antd';
const { Title } = Typography;

const { Search } = Input;
const Sider = Layout.Sider;
const {SubMenu} = Menu;

//{ categories, categoriesLevel, curCateId }
class PostSideMenu extends Component {
    // getInitialProps({pathname, query}) {        
    //   return {custom: 'custom'}; // pass some custom props to component
    // }
    constructor(props) {
        super(props);
    }

    renderBrandMain() {
        let content = [];
        if (this.props.appPostCategories && this.props.appPostCategories.length > 0) {
            this.props.appPostCategories.forEach(element => {
                content.push(
                    <SubMenu
                        key={element.id}
                        title={
                            <Link href="/posts/[cate]" as={`/posts/${element.urlname}`}>
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
                            Danh Muc Tin Tuc
                            </div>
                        </div>
                    </div>
                    </div>
                    <Menu
                        mode="inline"
                        inlineIndent={20}
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

    renderHighlight() {
        let views = [];
        views.push(
            <Title level={3}>{"Tin Noi Bat"}</Title>
        )
        if (this.props.highlights && this.props.highlights.length) {
            this.props.highlights.forEach(element => {
                views.push(
                <div style={{marginBottom: "10px", backgroundColor: "white"}}>
                    <Row>
                    <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                        {(element.Images && element.Images.length > 0) ?
                        (<img src={element.Images[0].formats.small ? element.Images[0].formats.small.url :
                            element.Images[0].formats.thumbnail.url} style={{width: "100%"}}/>)
                        : null}
                    </Col>

                    <Col xs={18} sm={18} md={18} lg={18} xl={18} xxl={18}>
                        <div style={{marginLeft: "5px"}}>
                        <Link href="/posts/[cate]/[id]" as={`/posts/${element.app_post_category.urlname}/${element.id}`}>
                            <a><Title level={5}>{element.Title}</Title></a>
                        </Link>
                        </div>
                    </Col>
                    </Row>
                </div>
                );
            });
            return views;
        }
        return null;
    }

    render() {
        const { appPostCategories } = this.props;
        console.log("--->PostSideMenu: render")
        return (
            <div>
                {this.renderBrandMain()}
                {this.renderHighlight()}
            </div>
        )
    }
}

export default PostSideMenu;