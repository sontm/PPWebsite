import React from 'react';
import MyLayout from '../../../components/layout'
import Head from 'next/head'
import Link from 'next/link'
import PostSideMenu from '../../../components/PostSideMenu'

import axios from "axios";
import { Row, Col, Button,Badge } from 'antd';
import { Typography } from 'antd';
const { Title } = Typography;

import AppConstants from '../../../util/AppConstant'

class PostCategoryList extends React.Component {

    render() {
        console.log("PostCategory List props((((((((((((((")
        console.log(this.props)
        let views = [];
        if (this.props.data && this.props.data.length) {
            this.props.data.forEach(posts => {
                if (posts.app_posts && posts.app_posts.length) {
                    posts.app_posts.forEach(element => {
                        views.push(
                        <div style={{minHeight: "200px", marginBottom: "20px", backgroundColor: "white"}}>
                            <Row>
                            <Col xs={6} sm={6} md={6} lg={6} xl={6} xxl={6}>
                                {(element.Images && element.Images.length > 0) ?
                                (<img src={element.Images[0].formats.small ? element.Images[0].formats.small.url :
                                    element.Images[0].formats.thumbnail.url} style={{width: "100%"}}/>)
                                : null}
                            </Col>

                            <Col xs={18} sm={18} md={18} lg={18} xl={18} xxl={18}>
                                <div style={{marginLeft: "10px"}}>
                                <Title level={3}>{element.Title}</Title>
                                <div dangerouslySetInnerHTML={{ 
                                    __html: element.Desc ? element.Desc : "" }} />
                                <Link href="/posts/[cate]/[id]" as={`/posts/${this.props.currentCate}/${element.id}`}>
                                <Button>Read More</Button>
                                </Link>
                                </div>
                            </Col>
                            </Row>
                        </div>
                        )
                    });
                }
            });
        }

        return (
            <MyLayout>
            <Head>
                <title>{"News"}</title>
            </Head>

            <div>
                <Row>
                <Col xs={24} sm={24} md={24} lg={19} xl={19} xxl={19}>
                {views}
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

export default PostCategoryList;

export async function getStaticPaths() {
    // Return a list of possible value for id
    const res = await axios.get(AppConstants.API_CMS_URL+"/app-post-categories")
    const arrNews = await res.data
    const paths = arrNews.map(n => {
        return {
        params: {
            cate: n.urlname
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
    console.log("Post Category Params---------------------------------")
    console.log(params)
    const res = await axios.get(AppConstants.API_CMS_URL+"/app-post-categories?urlname="+ params.cate)
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
            currentCate: params.cate,
            highlights: newsDataHighlight,
        }
    }
}