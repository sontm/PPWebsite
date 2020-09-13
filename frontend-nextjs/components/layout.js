import React, { Component } from 'react';
import styles from './layout.module.css'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import AppHeader from './AppHeader';
import { Layout, Row, Col, BackTop } from 'antd';

import {actClientCategoryGet} from '../redux/SiteInfoReducer';

const { Content, Header, Sider, Footer } = Layout;

//{children, home}
class MyLayout extends Component {
  componentDidMount () {
    console.log("---->Layout DidMount!")
    this.props.actClientCategoryGet();
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
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyLayout)
