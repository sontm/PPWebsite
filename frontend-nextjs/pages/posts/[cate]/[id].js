import React from 'react';
import MyLayout from '../../../components/layout'
import Head from 'next/head'
import axios from "axios";
import AppConstants from '../../../util/AppConstant'
import PostSideMenu from '../../../components/PostSideMenu'
import { Row, Col} from 'antd';

export default class Post extends React.Component {
    render() {
        return (
            <MyLayout>
            <Head>
                <title>{this.props.data.Title}</title>
            </Head>

            <div>
                <Row>
                <Col xs={24} sm={24} md={24} lg={19} xl={19} xxl={19}>
                    {this.props.data.Title}
                    <br />
                    {this.props.data._id}
                    <br />
                    {this.props.data.PublishedDate}

                    <div dangerouslySetInnerHTML={{ __html: this.props.data.Content }} />
                </Col>

                <Col xs={0} sm={0} md={0} lg={5} xl={5} xxl={5}>
                    <PostSideMenu appPostCategories={this.props.appPostCategories} highlights={this.props.highlights}/>
                </Col>
                </Row>
            </div>
            </MyLayout>
        )
    }
}

export async function getStaticPaths() {
    // Return a list of possible value for id
    const res = await axios.get(AppConstants.API_CMS_URL+"/app-posts")
    const arrNews = await res.data
    const paths = arrNews.map(n => {
        return {
        params: {
            id: n._id,
            cate: n.app_post_category.urlname
        }
        }
    })
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    // Fetch necessary data for the blog post using params.id
    console.log("Post Params---------------------------------")
    console.log(params)
    const res = await axios.get(AppConstants.API_CMS_URL+"/app-posts/"+ params.id)
    const newsData = await res.data

    const resHightlight = await axios.get(AppConstants.API_CMS_URL+"/app-posts")
    const newsDataHighlight = await resHightlight.data

    const resCate = await axios.get(AppConstants.API_CMS_URL+"/app-post-categories")
    const cateData = await resCate.data
    let appPostCategories = [];
    cateData.forEach(element => {
        appPostCategories.push(
            {"Name": element.Name,
            "DisplayOrder": element.DisplayOrder,
            "Desc": element.Desc ? element.Desc : "",
            "urlname": element.urlname,
            id: element.id
            }
        )
    })

    return {
        props: {
            data: newsData,
            appPostCategories,
            highlights: newsDataHighlight,
        }
    }
}