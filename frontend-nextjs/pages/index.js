import React from 'react';
import Head from 'next/head'
import Link from 'next/link'
import MyLayout from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import axios from "axios";
import dynamic from 'next/dynamic'

import { Button, Radio } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MyLayout home>
        <Head>
          <title>Wel come to PhuPhuong</title>
        </Head>
        <section className={utilStyles.headingMd}>
          <p>[Your Self Introduction]</p>
          <p>
            (This is a sample website - you’ll be building a site like this on{' '}
            <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
          </p>
        </section>

        <Button type="primary">
          Primary
        </Button>
        <Button type="primary" icon={<DownloadOutlined />}>
          Download
        </Button>

      </MyLayout>
    )
  }
}

//getStaticProps and getStaticPaths runs only on the server-side. 
//It will never be run on the client-side. 
//It won’t even be included in the JS bundle for the browser. 
// export async function getStaticProps() {
//   const allPostsData = getSortedPostsData()

//   const res = await axios.get(process.env.API_URL+"/prod-products")
//   const data = await res.data
//   return {
//     props: {
//       data
//     }
//   }
// }

// export async function getServerSideProps() {
//   const res = await axios.get(process.env.API_URL+"/prod-products")
//   const data = await res.data
//   return {
//     props: {
//       data
//     }
//   }
// }

// export async function getServerSideProps(context) {
//   return {
//     props: {
//       // props for your component
//     }
//   }
// }



