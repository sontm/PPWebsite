import React from 'react';
import { connect } from 'react-redux'

import styles from './AppHeader.module.css';
import Link from 'next/link'
import dynamic from 'next/dynamic'
import {ShoppingCartOutlined, UserOutlined, MenuOutlined, ShopOutlined} from '@ant-design/icons';
import { Layout, Menu, Dropdown, Input, Popover } from 'antd';
import { Row, Col, Button,Badge } from 'antd';
const { Search } = Input;
const Header = Layout.Header;
const {SubMenu} = Menu;

function AppHeader(param) {
    return (
        <React.Fragment>
          {/* <div className={this.state.hoveredMenuList ? "flyout-outside-mask" : 
            (this.state.hoveredBrandMenu ? "flyout-outside-mask-brand" : "")}></div> */}
          <Header>
          <div className={styles['app-header']}>
          <Row>
            <Col xs={0} sm={4} md={4} lg={4} xl={4} xxl={4}>
            <Link href="/">
            <div className={styles['app-title']} >
              <span>Phu Phuong</span>
            </div>
            </Link>
            </Col>

            <Col xs={24} sm={20} md={12} lg={10} xl={10} xxl={10}>
              <Search
                placeholder="Search product, category..."
                enterButton={true}
                size="large"
                value={""}
                onChange={console.log("this.onChangeSearch")}
                onSearch={console.log("this.onSearchTerm")}
            /></Col>

            <Col xs={0} sm={0} md={8} lg={10} xl={10} xxl={10}>
              <Row>
                <Col md={7} lg={7} xl={7} xxl={7}>
                <div className={styles['top-header-menu-item']}>
                  <Link href="/customer/orders">
                  <Button type="link" size="large">
                    <ShoppingCartOutlined style={{fontSize:"1.2em", color:"white"}} className={styles['show-only-in-md']}/>
                    <span className={styles['hidden-in-md']} style={{color: "white"}}>Theo Dõi Đơn Hàng</span>
                  </Button>
                  </Link>
                </div>
                </Col>
                <Col md={7} lg={7} xl={7} xxl={7}>
                <div className={styles['top-header-menu-item']}>
                <Popover content={"this.renderPopoverUser()"} placement="bottom">
                  <Button type="link" size="large">
                    <UserOutlined  style={{fontSize:"1.2em", color:"white"}} className={styles['show-only-in-md']}/>
                    <span className={styles['hidden-in-md']} style={{color: "white"}}>
                      {"Tài Khoản"}
                    </span>
                  </Button>
                </Popover>
                </div>
                </Col>

                <Col md={10} lg={10} xl={10} xxl={10}>
                <div className={styles['cart-container']}>
                  <Link href="/cart">
                  <Button  ghost size="large">
                    <ShoppingCartOutlined style={{fontSize:"1.2em", color:"white"}} className={styles['show-only-in-md']}/>
                    <span className={styles['hidden-in-md']}>Giỏ Hàng</span>
                    <Badge showZero count={param.modalReducer.cartNum} 
                      className={styles['cart-badge']}/>
                  </Button>
                  </Link>
                </div>
                </Col>
              </Row>
              </Col>
          </Row>

          <Row>
          <Col xs={0} sm={0} md={12} lg={6} xl={6} xxl={4}>
            <div onMouseEnter={console.log("this.onMenuListHover")} 
                onMouseLeave={console.log("this.onMenuListOut")}
              style={{marginLeft:"15px"}} className={styles['hamburger-category-menu']}>
              <MenuOutlined />
              <span className={styles['category-menu-text']} >Danh Mục Sản Phẩm</span>
            </div>
          </Col>

          <Col xs={0} sm={0} md={12} lg={6} xl={6} xxl={4}>
            <div onMouseEnter={console.log("this.onBrandMenuHover")} 
                onMouseLeave={console.log("this.onBrandMenuOut")}
              style={{marginLeft:"15px"}} className={styles['hamburger-category-menu']}>
              <ShopOutlined />
              <span className={styles['category-menu-text']} >Thương Hiệu</span>
            </div>
          </Col>
          </Row>
        </div>
        </Header>
        </React.Fragment>
    )
}

export default connect((state) => state)(AppHeader);