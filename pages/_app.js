import '../styles/globals.css'
import Layout from '../components/layout/layout'
import Head from 'next/head'
import {NotificationProvider} from '../store/NotificationContext'

function MyApp({ Component, pageProps }) {
  return <NotificationProvider>
            <Layout>
              <Head>
                <title>NextJS Events</title>
                <meta name='description' content='NextJS Events'/>
                <meta name='viewport' content='initial-scale=1.0, width=device-width'/>
              </Head>
              <Component {...pageProps} />
            </Layout>
      </NotificationProvider>
}

export default MyApp
