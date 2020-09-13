import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styles from './AppHeader.module.css';
import Link from 'next/link'
import dynamic from 'next/dynamic'
import AppDropdownMenu from './AppDropdownMenu';

import {ShoppingCartOutlined, UserOutlined, MenuOutlined, ShopOutlined} from '@ant-design/icons';
import { Layout, Menu, Dropdown, Input, Popover } from 'antd';
import { Row, Col, Button,Badge } from 'antd';
const { Search } = Input;
const Header = Layout.Header;
const {SubMenu} = Menu;

class AppHeader extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      hoveredMenuList: false,
      hoveredParent: "",

      hoveredBrandMenu: false,
      hoveredBrandContainer:false,

      searchTerm:""
      
    };
    this.onMenuListHover = this.onMenuListHover.bind(this);   
    this.onMenuListOut = this.onMenuListOut.bind(this);   
    this.onParentMenuHover = this.onParentMenuHover.bind(this);   
    this.onMenuContainerOut = this.onMenuContainerOut.bind(this);   
    this.onParentMenuClick = this.onParentMenuClick.bind(this);   
  }
  // WHen mouse over DanhMucSanPham
  onMenuListHover() {
    if (!this.isHomePage) {
      // Below timeout to prevent when Mouse only Move through DanhMucSanPham-menu shown
      // wait 300ms to show Menu list
      this.timeout = setTimeout(() => {
        this.setState({
          hoveredMenuList: true
        })
      },300);
      
    }
  }
  // WHen mouse out DanhMucSanPham
  onMenuListOut() {
    if (!this.isHomePage) {
      if(this.timeout) {
        clearTimeout(this.timeout);
      }

      // Below Timeout to make Time for Mouse move from DanhMucSanPham to the shown menu below
      // If is not SET any more, mean hover then right after that, will disappear
      setTimeout(() => {
        if (this.state.hoveredParent == "") {
          this.setState({
            hoveredMenuList: false,
            hoveredParent: ""
          })
        }
      }, 100);
    }
  }
  onParentMenuHover(e) {
    this.setState({
      hoveredParent: e.target.textContent.trim()
    })
  }
  onMenuContainerOut() {
    this.setState({
      hoveredMenuList: false,
      hoveredParent: ""
    })
  }
  onParentMenuClick() {
    this.setState({
      hoveredMenuList: false,
      hoveredParent: ""
    })
  }


  render() {
    let isHomePage = this.props.isHome;
    this.isHomePage = isHomePage;
    console.log("AppHeader------------")
    console.log(this.props.siteInfo.categoriesLevel)
    let appDropDownMenu = 
        <AppDropdownMenu config={this.props.siteInfo.categoriesLevel} 
          onParentMenuOut={this.onParentMenuOut} onMenuContainerOut={this.onMenuContainerOut}
          onParentMenuHover={this.onParentMenuHover} hoveredParent={this.state.hoveredParent}
          onParentMenuClick={this.onParentMenuClick}
          hoveredMenuList={this.state.hoveredMenuList}
          isHomePage={isHomePage}
          />;

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
                    <Badge showZero count={1} 
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
            <div onMouseEnter={this.onMenuListHover} onMouseLeave={this.onMenuListOut}
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

          {isHomePage ? null : appDropDownMenu}

        </div>
        </Header>
        {isHomePage ? appDropDownMenu: null}
        </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => (state);
const mapDispatchToProps = (dispatch) => {
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AppHeader)
