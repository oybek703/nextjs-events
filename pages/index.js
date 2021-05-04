import React from 'react'
import EventList from '../components/EventList'
import {getFeaturedEvents} from '../helpers/api-util'
import Head from 'next/head'
import NewsletterRegistration from '../components/input/NewsletterRegistration'

const HomePage = ({events}) => {
    return (
        <div>
            <Head>
                <title>NextJS Featured Events</title>
                <meta name='description' content='Awesome NextJS events that helps you grow...'/>
            </Head>
            <NewsletterRegistration/>
             <EventList items={events}/>
        </div>
    )
}

export default HomePage

export async function getStaticProps() {
    const events = await getFeaturedEvents()
    return {
        props: {
            events
        },
        revalidate: 1800
    }
}
