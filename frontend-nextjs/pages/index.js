import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import axios from "axios";
import { getSortedPostsData } from '../lib/posts'

import { Button } from '@material-ui/core';

export default function Home({arrNews}) {
  return (
    <Layout home>
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
          {arrNews.map(({ _id, PublishedDate, Title, ShortDescription }) => (
            <li className={utilStyles.listItem} key={_id}>
              <Link href="/posts/[_id]" as={`/posts/${_id}`}>
                <a>{Title}</a>
              </Link>
              <br />
              {ShortDescription}
              <br />
              {PublishedDate}
            </li>
          ))}
        </ul>
      </section>

      <Button color="secondary">Hello World</Button>
    </Layout>
  )
}

//getStaticProps and getStaticPaths runs only on the server-side. 
//It will never be run on the client-side. 
//It won’t even be included in the JS bundle for the browser. 
export async function getStaticProps() {
  const allPostsData = getSortedPostsData()

  const res = await axios.get(process.env.API_URL+"/app-news")
  const arrNews = await res.data
  return {
    props: {
      arrNews
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



