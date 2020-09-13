// import App from 'next/app'
import React from 'react';
import "../styles/antd.less";
import '../styles/global.css'

import { Provider } from 'react-redux'
import { wrapper } from '../redux/store'

console.log("@@@@@@@@@@@@@@@@@@@@ _app.js")
// class HiApp extends React.Component {
//     componentDidMount () {
//       console.log("---->HiApp DidMount!")
//     }
//     render () {
//       console.log("---->HiApp render!")
//       return (
//         <this.props.Component {...this.props.pageProps} />
//       )
//     }
//   }

const MyApp = ({ Component, pageProps }) => {
    return <Component {...pageProps} />
}

export default wrapper.withRedux(MyApp)

