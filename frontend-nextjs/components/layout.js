import React, { Component } from 'react';
import styles from './layout.module.css'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import AppHeader from './AppHeader';
import { Layout, Row, Col, BackTop } from 'antd';

import {actClientCategoryGet, actClientBrandGet} from '../redux/SiteInfoReducer';
import {actUserGetProfile, actUserGetRecentViews, actUserGetFavorites} from '../redux/UserReducer';

const { Content, Header, Sider, Footer } = Layout;

//{children, home}
class MyLayout extends Component {

  // First Function Called When Refresh page
  componentDidMount () {
    console.log("---------------->Layout DidMount!")
    this.props.actClientCategoryGet();
    this.props.actClientBrandGet();

    this.props.actUserGetProfile();
  }
  componentDidUpdate() {
    console.log("---------------->Layout did updateeeeeeeeeeee:" + this.props.user.isLogined)
    if (!this.mHasJustLogin && this.props.user.isLogined) {
      // User have just Logined
      console.log("*********** User Have just Loginnn")
      this.mHasJustLogin = true;

      // Load recent views
      this.props.actUserGetRecentViews(this.props.user.userProfile? this.props.user.userProfile.id : null)
      this.props.actUserGetFavorites(this.props.user.userProfile? this.props.user.userProfile.id : null)
    }
    
    if (this.mHasJustLogin && !this.props.user.isLogined) {
      // User have just LogOut
      this.mHasJustLogin = false
      console.log("*********** User Have just LogOut")
    }
  }
  render () {
    console.log("---->Layout render!, isHome:" + this.props.home)
    return (
      <Layout>
        <AppHeader isHome={this.props.home}/>

        <Layout className={styles['app-container']}>
        <Content>
          <div style={{marginLeft: "5%", marginRight: "5%"}}>
          {this.props.children}
          </div>
        </Content>
        </Layout>

        <Footer style={{ textAlign: 'center', minHeight:"200px", marginTop:"20px"}}>
            <div className={styles['app-footer']}>
                Phu Phuong ©2019
            </div>
        </Footer>
      </Layout>
    )
  }
}

const mapStateToProps = (state) => (state);
const mapDispatchToProps = (dispatch) => {
    return {
      actClientCategoryGet: bindActionCreators(actClientCategoryGet, dispatch),
      actClientBrandGet: bindActionCreators(actClientBrandGet, dispatch),
      actUserGetProfile: bindActionCreators(actUserGetProfile, dispatch),
      actUserGetRecentViews: bindActionCreators(actUserGetRecentViews, dispatch),
      actUserGetFavorites: bindActionCreators(actUserGetFavorites, dispatch),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyLayout)
