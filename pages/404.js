import React from 'react'
import ErrorAlert from '../components/error-alert/error-alert'
import Head from 'next/head'

const PageNotFound= () => {
    return (
        <div className='center'>
            <Head>
                <title>Page Not Found | 404</title>
            </Head>
            <ErrorAlert>
                <h1>Page Not Found</h1>
            </ErrorAlert>
        </div>
    )
}

export default PageNotFound