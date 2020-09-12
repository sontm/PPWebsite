import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import dynamic from 'next/dynamic'

import PrimarySearchAppBar from './appbar';
import AppHeader from './AppHeader';

import { Layout, Row, Col, BackTop } from 'antd';
const { Content, Header, Sider, Footer } = Layout;


export default function MyLayout({ children, home }) {
  return (
    <Layout>
      <AppHeader />

      <Layout className={styles['app-container']}>
      <Content>
        <div style={{marginLeft: "5%", marginRight: "5%"}}>
        {children}
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
