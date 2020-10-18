import React from 'react';
import Head from 'next/head'
import Link from 'next/link'
import MyLayout from '../components/layout'
import axios from "axios";
import dynamic from 'next/dynamic'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Button, Radio } from 'antd';
import { Row, Col, Card} from 'antd';
import ScrollMenu from 'react-horizontal-scrolling-menu';

import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';
import styles from './index.module.css';
import ProductWrapper from '../components/ProductWrapper';
import AppConstants,{LOCAL_RECENTVIEWS, LOCAL_CSRF_TOKEN} from '../util/AppConstant';
import Helpers from '../util/Helpers'
import { Typography } from 'antd';

import {actUserGetRecentViews} from '../redux/UserReducer';

const { Title } = Typography;

var Carousel = require('react-responsive-carousel').Carousel;
const { Meta } = Card;

//.carousel .control-arrow,.carousel.carousel-slider .control-arrow{-webkit-transition:all .25s ease-in;-moz-transition:all .25s ease-in;-ms-transition:all .25s ease-in;-o-transition:all .25s ease-in;transition:all .25s ease-in;opacity:.4;filter:alpha(opacity=40);position:absolute;z-index:2;top:20px;background:none;border:0;font-size:32px;cursor:pointer}.carousel .control-arrow:hover{opacity:1;filter:alpha(opacity=100)}.carousel .control-arrow:before,.carousel.carousel-slider .control-arrow:before{margin:0 5px;display:inline-block;border-top:8px solid transparent;border-bottom:8px solid transparent;content:''}.carousel .control-disabled.control-arrow{opacity:0;filter:alpha(opacity=0);cursor:inherit;display:none}.carousel .control-prev.control-arrow{left:0}.carousel .control-prev.control-arrow:before{border-right:8px solid #fff}.carousel .control-next.control-arrow{right:0}.carousel .control-next.control-arrow:before{border-left:8px solid #fff}.carousel-root{outline:none}.carousel{position:relative;width:100%}.carousel *{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.carousel img{width:100%;display:inline-block;pointer-events:none}.carousel .carousel{position:relative}.carousel .control-arrow{outline:0;border:0;background:none;top:50%;margin-top:-13px;font-size:18px}.carousel .thumbs-wrapper{margin:20px;overflow:hidden}.carousel .thumbs{-webkit-transition:all .15s ease-in;-moz-transition:all .15s ease-in;-ms-transition:all .15s ease-in;-o-transition:all .15s ease-in;transition:all .15s ease-in;-webkit-transform:translate3d(0, 0, 0);-moz-transform:translate3d(0, 0, 0);-ms-transform:translate3d(0, 0, 0);-o-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0);position:relative;list-style:none;white-space:nowrap}.carousel .thumb{-webkit-transition:border .15s ease-in;-moz-transition:border .15s ease-in;-ms-transition:border .15s ease-in;-o-transition:border .15s ease-in;transition:border .15s ease-in;display:inline-block;margin-right:6px;white-space:nowrap;overflow:hidden;border:3px solid #fff;padding:2px}.carousel .thumb:focus{border:3px solid #ccc;outline:none}.carousel .thumb.selected,.carousel .thumb:hover{border:3px solid #333}.carousel .thumb img{vertical-align:top}.carousel.carousel-slider{position:relative;margin:0;overflow:hidden}.carousel.carousel-slider .control-arrow{top:0;color:#fff;font-size:26px;bottom:0;margin-top:0;padding:5px}.carousel.carousel-slider .control-arrow:hover{background:rgba(0,0,0,0.2)}.carousel .slider-wrapper{overflow:hidden;margin:auto;width:100%;-webkit-transition:height .15s ease-in;-moz-transition:height .15s ease-in;-ms-transition:height .15s ease-in;-o-transition:height .15s ease-in;transition:height .15s ease-in}.carousel .slider-wrapper.axis-horizontal .slider{-ms-box-orient:horizontal;display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-moz-flex;display:-webkit-flex;display:flex}.carousel .slider-wrapper.axis-horizontal .slider .slide{flex-direction:column;flex-flow:column}.carousel .slider-wrapper.axis-vertical{-ms-box-orient:horizontal;display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-moz-flex;display:-webkit-flex;display:flex}.carousel .slider-wrapper.axis-vertical .slider{-webkit-flex-direction:column;flex-direction:column}.carousel .slider{margin:0;padding:0;position:relative;list-style:none;width:100%}.carousel .slider.animated{-webkit-transition:all .35s ease-in-out;-moz-transition:all .35s ease-in-out;-ms-transition:all .35s ease-in-out;-o-transition:all .35s ease-in-out;transition:all .35s ease-in-out}.carousel .slide{min-width:100%;margin:0;position:relative;text-align:center;background:#000}.carousel .slide img{width:100%;vertical-align:top;border:0}.carousel .slide iframe{display:inline-block;width:calc(100% - 80px);margin:0 40px 40px;border:0}.carousel .slide .legend{-webkit-transition:all .5s ease-in-out;-moz-transition:all .5s ease-in-out;-ms-transition:all .5s ease-in-out;-o-transition:all .5s ease-in-out;transition:all .5s ease-in-out;position:absolute;bottom:40px;left:50%;margin-left:-45%;width:90%;border-radius:10px;background:#000;color:#fff;padding:10px;font-size:12px;text-align:center;opacity:0.25;-webkit-transition:opacity .35s ease-in-out;-moz-transition:opacity .35s ease-in-out;-ms-transition:opacity .35s ease-in-out;-o-transition:opacity .35s ease-in-out;transition:opacity .35s ease-in-out}.carousel .control-dots{position:absolute;bottom:0;margin:10px 0;padding:0;text-align:center;width:100%}@media (min-width: 960px){.carousel .control-dots{bottom:0}}.carousel .control-dots .dot{-webkit-transition:opacity .25s ease-in;-moz-transition:opacity .25s ease-in;-ms-transition:opacity .25s ease-in;-o-transition:opacity .25s ease-in;transition:opacity .25s ease-in;opacity:.3;filter:alpha(opacity=30);box-shadow:1px 1px 2px rgba(0,0,0,0.9);background:#fff;border-radius:50%;width:8px;height:8px;cursor:pointer;display:inline-block;margin:0 8px}.carousel .control-dots .dot.selected,.carousel .control-dots .dot:hover{opacity:1;filter:alpha(opacity=100)}.carousel .carousel-status{position:absolute;top:0;right:0;padding:5px;font-size:10px;text-shadow:1px 1px 1px rgba(0,0,0,0.9);color:#fff}.carousel:hover .slide .legend{opacity:1}
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recentViews: []
    }
    this.isLoadRecentViewsDone = false;
    this.isLoadProdDone = false;
  }

  //componentDidMount
  //componentDidUpdate() {
  componentDidMount() {
    console.log("***********Home Page did mount")
    if (!this.isLoadRecentViewsDone) {
      this.isLoadRecentViewsDone= true;

      if (!localStorage.getItem(LOCAL_CSRF_TOKEN)) {
        // Use RecentViews from Local Storage
        let v = localStorage.getItem(LOCAL_RECENTVIEWS);
        let recentViews = JSON.parse(v);

        if (recentViews && recentViews.length) {
          let idList = [];
          recentViews.forEach((item, idx) => {
            idList.push(item.ProductID);
          })

          // Add data from allProducts data 
          this.props.allProducts.forEach(item => {
            let theIdx = idList.indexOf(item.id);
            if ( theIdx >= 0 ) {
              // Add this product data
              recentViews[theIdx].Product = item;
            }
          })
          console.log("   recentViews")
          console.log(recentViews)
          this.setState({
            recentViews
          })
        }
      }
    }
    
  }


  render() {
    let pViewPromotes = [];
    let pViewHotDeals = [];
    let pViewBrands = [];
    if (this.props.promotes.length && this.props.categories.length && this.props.brands.length ) {
      this.props.promotes.forEach(element => {
        pViewPromotes.push (
          <Col xs={12} sm={12} md={8} lg={6} xl={6} xxl={4} key={element.id}>
            <ProductWrapper singleProduct={element} categories={this.props.categories} brands={this.props.brands}/>
          </Col>)
      })
    }
    if (this.props.hotdeals.length && this.props.categories.length && this.props.brands.length ) {
      this.props.hotdeals.forEach(element => {
        pViewHotDeals.push (
          <ProductWrapper key={element.id} singleProduct={element} categories={this.props.categories} brands={this.props.brands}/>
        )
      })
    }
    if (this.props.brands.length ) {
      this.props.brands.forEach(element => {
        pViewBrands.push (
          <Link href="/brands/[id]" as={`/brands/${element.id}`}>
          <Card hoverable style={{ width: 150, margin: "3px" }}
          cover={<img alt="example" src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/863px-Apple_logo_black.svg.png" />}>
            <Meta title={element.Name} style={{textAlign: "center"}}/>
          </Card>
          </Link>
        )
      })
    }

    let pViewLatestPosts = [];
    if (this.props.latestPosts.length ) {
      this.props.latestPosts.forEach(element => {
        pViewLatestPosts.push (
          // <Col xs={24} sm={24} md={12} lg={12} xl={8} xxl={8} key={element.id}>
          <div className={styles['post-wrapper']}>
              <Row style={{width:"100%", display: "flex",justifyContent: "center"}}>
                  <Link href="/posts/[cate]/[id]" as={`/posts/${element.app_post_category.urlname}/${element.id}`}>
                    <a>
                    {(element.Images && element.Images.length > 0) ?
                    (<img src={element.Images[0].formats.small ? element.Images[0].formats.small.url :
                        element.Images[0].formats.thumbnail.url} style={{height: "220px"}}/>)
                    : null}
                    </a>
                  </Link>
              </Row>
              <Row>
                <div style={{width:"100%", paddingLeft: "5px", paddingRight: "5px", 
                marginTop: "15px",display: "flex",justifyContent: "center"}}>
                  <Link href="/posts/[cate]/[id]" as={`/posts/${element.app_post_category.urlname}/${element.id}`}>
                      <a><Title level={5}>{element.Title}</Title></a>
                  </Link>
                </div>
              </Row>
              <Row>
                <div style={{width:"100%", padding: "12px", display: "flex",justifyContent: "center", marginTop: "10px"}}>
                  <div dangerouslySetInnerHTML={{ 
                      __html: element.Desc ? element.Desc : "" }} />
                </div>
              </Row>
          </div>
          // </Col>
        )
      })
    }

    // Recent Views------
    let pViewRecentViews = [];
    let pViewData = [];
    if (this.props.user.isLogined) {
      // Load from user 
      if (this.props.user.recentViews && this.props.user.recentViews.length) {
        pViewData = [...this.props.user.recentViews];
        let idList = [];
        pViewData.forEach((item, idx) => {
          idList.push(item.ProductID);
        })

        // Add data from allProducts data 
        this.props.allProducts.forEach(item => {
          let theIdx = idList.indexOf(item.id);
          if ( theIdx >= 0 ) {
            // Add this product data
            pViewData[theIdx].Product = item;
          }
        })
      }
    } else if (this.state.recentViews && this.state.recentViews.length) {
      // or load from Local Storage
      pViewData = this.state.recentViews;
    }
        
    pViewData.forEach(element => {
      if (element.Product) {
        pViewRecentViews.push (
          <ProductWrapper key={element.Product.id} singleProduct={element.Product} 
            categories={this.props.categories} brands={this.props.brands}/>
        )
      }
    })


    // Recent Views------
    let pViewFavorites = [];
    let pViewDataFav = [];
    if (this.props.user.isLogined) {
      // Load from user 
      if (this.props.user.favorites && this.props.user.favorites.length) {
        pViewDataFav = [...this.props.user.favorites];
        let idList = [];
        pViewDataFav.forEach((item, idx) => {
          idList.push(item.ProductID);
        })

        // Add data from allProducts data 
        this.props.allProducts.forEach(item => {
          let theIdx = idList.indexOf(item.id);
          if ( theIdx >= 0 ) {
            // Add this product data
            pViewDataFav[theIdx].Product = item;
          }
        })
      }
    }
    pViewDataFav.forEach(element => {
      if (element.Product) {
        pViewFavorites.push (
          <ProductWrapper key={element.Product.id} singleProduct={element.Product} 
            categories={this.props.categories} brands={this.props.brands}/>
        )
      }
    })

    return (
      <MyLayout home>
        <Head>
          <title>Wel come to PhuPhuong</title>
        </Head>
        <div className={styles['homepage-container']}>
          <div className={styles['home-first-impression-space']}>
          <Row>
          <Col xs={0} sm={0} md={0} lg={4} xl={4} xxl={4}></Col>
          <Col xs={24} sm={24} md={24} lg={20} xl={20} xxl={20}>
              <Carousel showArrows={true} infiniteLoop={true} autoPlay={true} 
                      showThumbs={false} showStatus={false} stopOnHover={false}
                      swipeable={true} useKeyboardArrows={true}>
                  <div>
                      <img src="/images/home/carousel/carousel-1.jpg" 
                        className={styles['my-img-carousel']}/>
                      <Link href="/posts">
                        <a>
                        <div style={{width: "100%", "textAlign": "center", background: "rgba(0,0,0,0)"}}>
                          <Button  size="large" style={{display: "inline-block"}}>View More</Button>
                        </div>
                        </a>
                      </Link>
                  </div>
                  <div>
                      <img src="/images/home/carousel/carousel-2.jpg" 
                        className={styles['my-img-carousel']}/>
                      <Link href="/posts">
                        <a>
                        <div style={{width: "100%", "textAlign": "center", background: "rgba(0,0,0,0)"}}>
                          <Button  size="large" style={{display: "inline-block"}}>View More</Button>
                        </div>
                        </a>
                      </Link>
                  </div>
                  <div>
                      <img src="/images/home/carousel/carousel-3.jpg" 
                      className={styles['my-img-carousel']}/>
                      <Link href="/posts">
                        <a>
                        <div style={{width: "100%", "textAlign": "center", background: "rgba(0,0,0,0)"}}>
                          <Button  size="large" style={{display: "inline-block"}}>View More</Button>
                        </div>
                        </a>
                      </Link>
                  </div>
                  <div>
                      <img src="/images/home/carousel/carousel-4.jpg" 
                      className={styles['my-img-carousel']}/>
                    <Link href="/posts">
                        <a>
                        <div style={{width: "100%", "textAlign": "center", background: "rgba(0,0,0,0)"}}>
                          <Button  size="large" style={{display: "inline-block"}}>View More</Button>
                        </div>
                        </a>
                      </Link>
                  </div>
              </Carousel>
          </Col>
          </Row>
          </div>

        <div className={styles['empty-space-20px']} />
        {/* Server Query */}
        <Card title="Hot Deals" bordered={false}>
          <ScrollMenu
            data={pViewHotDeals}
            arrowLeft={
              <div className={styles['scroll-menu-arrow']}>
                {<LeftCircleOutlined style={{fontSize:"30px", color: "grey"}}/>}
              </div>}
            arrowRight={
              <div className={styles['scroll-menu-arrow']}>
                {<RightCircleOutlined style={{fontSize:"30px",color: "grey"}}/>}
              </div>}
            wheel={false}
            translate={5}
            transition={0.3}
            inertiaScrollingSlowdown={0.25}
            scrollBy={1}
            hideSingleArrow={true}
            hideArrows={true}
          />

          <div className={styles['empty-space-30px']} />
          <Link href="/hotdeal">
            <div style={{width: "100%", "textAlign": "center"}}>
              <Button  size="large" style={{display: "inline-block"}}>View More</Button>
            </div>
          </Link>
        </Card>


        <div className={styles['empty-space-20px']} />
        {/* Server Query */}
        <Card title="Hot Products" bordered={false}>
          <Row>
            {pViewPromotes}
          </Row>
        </Card>
        


        <div className={styles['empty-space-20px']} />
        {/* Client Query */}
        <Card title="San Pham Da Xem" bordered={false}>
          <ScrollMenu
            data={pViewRecentViews}
            arrowLeft={
              <div className={styles['scroll-menu-arrow']}>
                {<LeftCircleOutlined style={{fontSize:"30px", color: "grey"}}/>}
              </div>}
            arrowRight={
              <div className={styles['scroll-menu-arrow']}>
                {<RightCircleOutlined style={{fontSize:"30px",color: "grey"}}/>}
              </div>}
            wheel={false}
            translate={5}
            transition={0.3}
            inertiaScrollingSlowdown={0.25}
            scrollBy={1}
            hideSingleArrow={true}
            hideArrows={true}
          />
        </Card>


        <div className={styles['empty-space-20px']} />
        {/* Client Query */}
        <Card title="San Pham Yeu Thich" bordered={false}>
          <ScrollMenu
            data={pViewFavorites}
            arrowLeft={
              <div className={styles['scroll-menu-arrow']}>
                {<LeftCircleOutlined style={{fontSize:"30px", color: "grey"}}/>}
              </div>}
            arrowRight={
              <div className={styles['scroll-menu-arrow']}>
                {<RightCircleOutlined style={{fontSize:"30px",color: "grey"}}/>}
              </div>}
            wheel={false}
            translate={5}
            transition={0.3}
            inertiaScrollingSlowdown={0.25}
            scrollBy={1}
            hideSingleArrow={true}
            hideArrows={true}
          />
        </Card>

        <div className={styles['empty-space-20px']} />
        {/* Client Query */}
        <Card title="Latest News" bordered={false}>
          <ScrollMenu
            data={pViewLatestPosts}
            arrowLeft={
              <div className={styles['scroll-menu-arrow']}>
                {<LeftCircleOutlined style={{fontSize:"30px", color: "grey"}}/>}
              </div>}
            arrowRight={
              <div className={styles['scroll-menu-arrow']}>
                {<RightCircleOutlined style={{fontSize:"30px",color: "grey"}}/>}
              </div>}
            wheel={false}
            translate={5}
            transition={0.3}
            inertiaScrollingSlowdown={0.25}
            scrollBy={1}
            hideSingleArrow={true}
            hideArrows={true}
            style={{background:"white"}}
          />

          <div className={styles['empty-space-30px']} />
          <Link href="/posts">
            <a>
            <div style={{width: "100%", "textAlign": "center"}}>
              <Button  size="large" style={{display: "inline-block"}}>View More</Button>
            </div>
            </a>
          </Link>
        </Card>

        <div className={styles['empty-space-20px']} />
        {/* Server Query */}
        <Card title="Shop by Brands" bordered={false}>
          <ScrollMenu
              data={pViewBrands}
              arrowLeft={
                <div className={styles['scroll-menu-arrow']}>
                  {<LeftCircleOutlined style={{fontSize:"30px", color: "grey"}}/>}
                </div>}
              arrowRight={
                <div className={styles['scroll-menu-arrow']}>
                  {<RightCircleOutlined style={{fontSize:"30px",color: "grey"}}/>}
                </div>}
              wheel={false}
              translate={5}
              transition={0.3}
              inertiaScrollingSlowdown={0.25}
              scrollBy={1}
              hideSingleArrow={true}
              hideArrows={true}
            />
        </Card>
        </div>

      </MyLayout>
    )
  }
}

// getStaticProps and getStaticPaths runs only on the server-side. 
// It will never be run on the client-side. 
// It won’t even be included in the JS bundle for the browser. 
export async function getStaticProps() {
  const resPromote = await axios.get(AppConstants.API_CMS_URL+"/prod-products?IsPromote=true&IsActive=true")
  // Get List of Categories
  const resAllCate = await axios.get(AppConstants.API_CMS_URL+"/prod-categories")
  const categories = await resAllCate.data;

  const resAllBrand = await axios.get(AppConstants.API_CMS_URL+"/prod-brands")
  const brands = await resAllBrand.data;

  const resProds = await axios.get(AppConstants.API_CMS_URL+"/prod-products/")
  let allProducts = await resProds.data
  let hotdealsAll = [];
  // Only add Product which is Parents: has some childs, no Parent
  allProducts.forEach(element => {
      let discountInfo = Helpers.parseDiscountInformation(element, categories, brands);
      element.discountPrice = discountInfo.discountPrice;
      if (element.discountPrice) { 
        hotdealsAll.push(element);
      }
  });

  // Sort Large to Small
  hotdealsAll.sort((a,b) => (a.discountPrice < b.discountPrice) ? 1 : ((b.discountPrice < a.discountPrice) ? -1 : 0)); 
  // Limit only 3 Row (12products) in Home Page
  let hotdeals = [];
  if (hotdealsAll.length > 12) {
    hotdeals= hotdealsAll.slice(0, 12);
  } else {
    hotdeals = hotdealsAll
  }

  // Get latest Posts
  const resPosts = await axios.get(AppConstants.API_CMS_URL+"/app-posts?_sort=PublishedDate:DESC&_limit=6")
  const latestPosts = await resPosts.data;

  // TODO Get Recent Views
  return {
    props: {
      promotes: resPromote.data,
      categories,
      brands,
      hotdeals,
      latestPosts,
      allProducts
    }
  }
}

const mapStateToProps = (state) => (state);
const mapDispatchToProps = (dispatch) => {
    return {
      actUserGetRecentViews: bindActionCreators(actUserGetRecentViews, dispatch),
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Home)

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



