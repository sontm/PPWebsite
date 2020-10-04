import React from 'react';
import Head from 'next/head'
import Link from 'next/link'
import MyLayout from '../components/layout'
import axios from "axios";
import dynamic from 'next/dynamic'

import { Button, Radio } from 'antd';
import { Row, Col, Card} from 'antd';

import { DownloadOutlined } from '@ant-design/icons';
import styles from './index.module.css';

var Carousel = require('react-responsive-carousel').Carousel;

//.carousel .control-arrow,.carousel.carousel-slider .control-arrow{-webkit-transition:all .25s ease-in;-moz-transition:all .25s ease-in;-ms-transition:all .25s ease-in;-o-transition:all .25s ease-in;transition:all .25s ease-in;opacity:.4;filter:alpha(opacity=40);position:absolute;z-index:2;top:20px;background:none;border:0;font-size:32px;cursor:pointer}.carousel .control-arrow:hover{opacity:1;filter:alpha(opacity=100)}.carousel .control-arrow:before,.carousel.carousel-slider .control-arrow:before{margin:0 5px;display:inline-block;border-top:8px solid transparent;border-bottom:8px solid transparent;content:''}.carousel .control-disabled.control-arrow{opacity:0;filter:alpha(opacity=0);cursor:inherit;display:none}.carousel .control-prev.control-arrow{left:0}.carousel .control-prev.control-arrow:before{border-right:8px solid #fff}.carousel .control-next.control-arrow{right:0}.carousel .control-next.control-arrow:before{border-left:8px solid #fff}.carousel-root{outline:none}.carousel{position:relative;width:100%}.carousel *{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.carousel img{width:100%;display:inline-block;pointer-events:none}.carousel .carousel{position:relative}.carousel .control-arrow{outline:0;border:0;background:none;top:50%;margin-top:-13px;font-size:18px}.carousel .thumbs-wrapper{margin:20px;overflow:hidden}.carousel .thumbs{-webkit-transition:all .15s ease-in;-moz-transition:all .15s ease-in;-ms-transition:all .15s ease-in;-o-transition:all .15s ease-in;transition:all .15s ease-in;-webkit-transform:translate3d(0, 0, 0);-moz-transform:translate3d(0, 0, 0);-ms-transform:translate3d(0, 0, 0);-o-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0);position:relative;list-style:none;white-space:nowrap}.carousel .thumb{-webkit-transition:border .15s ease-in;-moz-transition:border .15s ease-in;-ms-transition:border .15s ease-in;-o-transition:border .15s ease-in;transition:border .15s ease-in;display:inline-block;margin-right:6px;white-space:nowrap;overflow:hidden;border:3px solid #fff;padding:2px}.carousel .thumb:focus{border:3px solid #ccc;outline:none}.carousel .thumb.selected,.carousel .thumb:hover{border:3px solid #333}.carousel .thumb img{vertical-align:top}.carousel.carousel-slider{position:relative;margin:0;overflow:hidden}.carousel.carousel-slider .control-arrow{top:0;color:#fff;font-size:26px;bottom:0;margin-top:0;padding:5px}.carousel.carousel-slider .control-arrow:hover{background:rgba(0,0,0,0.2)}.carousel .slider-wrapper{overflow:hidden;margin:auto;width:100%;-webkit-transition:height .15s ease-in;-moz-transition:height .15s ease-in;-ms-transition:height .15s ease-in;-o-transition:height .15s ease-in;transition:height .15s ease-in}.carousel .slider-wrapper.axis-horizontal .slider{-ms-box-orient:horizontal;display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-moz-flex;display:-webkit-flex;display:flex}.carousel .slider-wrapper.axis-horizontal .slider .slide{flex-direction:column;flex-flow:column}.carousel .slider-wrapper.axis-vertical{-ms-box-orient:horizontal;display:-webkit-box;display:-moz-box;display:-ms-flexbox;display:-moz-flex;display:-webkit-flex;display:flex}.carousel .slider-wrapper.axis-vertical .slider{-webkit-flex-direction:column;flex-direction:column}.carousel .slider{margin:0;padding:0;position:relative;list-style:none;width:100%}.carousel .slider.animated{-webkit-transition:all .35s ease-in-out;-moz-transition:all .35s ease-in-out;-ms-transition:all .35s ease-in-out;-o-transition:all .35s ease-in-out;transition:all .35s ease-in-out}.carousel .slide{min-width:100%;margin:0;position:relative;text-align:center;background:#000}.carousel .slide img{width:100%;vertical-align:top;border:0}.carousel .slide iframe{display:inline-block;width:calc(100% - 80px);margin:0 40px 40px;border:0}.carousel .slide .legend{-webkit-transition:all .5s ease-in-out;-moz-transition:all .5s ease-in-out;-ms-transition:all .5s ease-in-out;-o-transition:all .5s ease-in-out;transition:all .5s ease-in-out;position:absolute;bottom:40px;left:50%;margin-left:-45%;width:90%;border-radius:10px;background:#000;color:#fff;padding:10px;font-size:12px;text-align:center;opacity:0.25;-webkit-transition:opacity .35s ease-in-out;-moz-transition:opacity .35s ease-in-out;-ms-transition:opacity .35s ease-in-out;-o-transition:opacity .35s ease-in-out;transition:opacity .35s ease-in-out}.carousel .control-dots{position:absolute;bottom:0;margin:10px 0;padding:0;text-align:center;width:100%}@media (min-width: 960px){.carousel .control-dots{bottom:0}}.carousel .control-dots .dot{-webkit-transition:opacity .25s ease-in;-moz-transition:opacity .25s ease-in;-ms-transition:opacity .25s ease-in;-o-transition:opacity .25s ease-in;transition:opacity .25s ease-in;opacity:.3;filter:alpha(opacity=30);box-shadow:1px 1px 2px rgba(0,0,0,0.9);background:#fff;border-radius:50%;width:8px;height:8px;cursor:pointer;display:inline-block;margin:0 8px}.carousel .control-dots .dot.selected,.carousel .control-dots .dot:hover{opacity:1;filter:alpha(opacity=100)}.carousel .carousel-status{position:absolute;top:0;right:0;padding:5px;font-size:10px;text-shadow:1px 1px 1px rgba(0,0,0,0.9);color:#fff}.carousel:hover .slide .legend{opacity:1}
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
                </div>
                <div>
                    <img src="/images/home/carousel/carousel-2.jpg" 
                      className={styles['my-img-carousel']}/>
                </div>
                <div>
                    <img src="/images/home/carousel/carousel-3.jpg" 
                    className={styles['my-img-carousel']}/>
                </div>
                <div>
                    <img src="/images/home/carousel/carousel-4.jpg" 
                    className={styles['my-img-carousel']}/>
                </div>
            </Carousel>
        </Col>
        </Row>
        </div>

        <div className={styles['empty-space-20px']} />
        <Card title="Hot Deals" bordered={false}>
            {/* <HotDiscountHome /> */}
        </Card>

        <div className={styles['empty-space-20px']} />
        {/* <FavoriteHome /> */}

        <div className={styles['empty-space-20px']} />
        <Card title="San Pham Ban Da Xem" bordered={false}>
            {/* <RecentViewHome /> */}
        </Card>
        </div>

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



