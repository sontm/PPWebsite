import Head from 'next/head'
import Link from 'next/link'
import MyLayout from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import axios from "axios";
import { getSortedPostsData } from '../lib/posts'

import { Button, Radio } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

export default function Home({data}) {
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

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {data.map(({ id, Name }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href="/products/[id]" as={`/products/${id}`}>
                <a>{Name}</a>
              </Link>
            </li>
          ))}
        </ul>
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

//getStaticProps and getStaticPaths runs only on the server-side. 
//It will never be run on the client-side. 
//It won’t even be included in the JS bundle for the browser. 
export async function getStaticProps() {
  const allPostsData = getSortedPostsData()

  const res = await axios.get(process.env.API_URL+"/prod-products")
  const data = await res.data
  return {
    props: {
      data
    }
  }
}

// export async function getServerSideProps(context) {
//   return {
//     props: {
//       // props for your component
//     }
//   }
// }



