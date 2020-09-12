// import App from 'next/app'
import "../styles/antd.less";
import '../styles/global.css'

import { Provider } from 'react-redux'
import { wrapper } from '../redux/store'

console.log("APIURL:" + process.env.API_URL)
const MyApp = ({ Component, pageProps }) => {
    return <Component {...pageProps} />
}
export default wrapper.withRedux(MyApp)

