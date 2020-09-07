import Layout from '../../components/layout'
import Head from 'next/head'
import axios from "axios";

export default function Post({ data }) {
    return (
        <Layout>
          <Head>
            <title>{data.Title}</title>
          </Head>

          {data.title}
          <br />
          {data._id}
          <br />
          {data.PublishedDate}

          <div dangerouslySetInnerHTML={{ __html: data.Content }} />
        </Layout>
      )
}

export async function getStaticPaths() {
    // Return a list of possible value for id
    const res = await axios.get(process.env.API_URL+"/app-news")
    const arrNews = await res.data
    const paths = arrNews.map(n => {
        return {
        params: {
            id: n._id
        }
        }
    })
    console.log("paths-----------------------------")
    console.log(paths)
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    // Fetch necessary data for the blog post using params.id
    console.log("Params---------------------------------")
    console.log(params)
    const res = await axios.get(process.env.API_URL+"/app-news/"+ params.id)
    const newsData = await res.data
    console.log(newsData)
    return {
        props: {
            data: newsData
        }
    }
}