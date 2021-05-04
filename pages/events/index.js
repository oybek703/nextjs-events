import React from 'react'
import EventList from '../../components/EventList'
import EventSearch from '../../components/EventSearch'
import {useRouter} from 'next/router'
import {getAllEvents} from '../../helpers/api-util'
import Head from 'next/head'

const Events = ({events}) => {
    const router = useRouter()
    function handleSearch(year, month) {
        const fullPath = `/events/${year}/${month}`
        router.push(fullPath)
    }
    return (
        <div>
            <Head>
                <title>All events</title>
                <meta name='description' content='Enjoy all NextJS events...'/>
            </Head>
            <EventSearch onSearch={handleSearch}/>
            <EventList items={events}/>
        </div>
    )
}

export default Events

export async function getStaticProps() {
    const events = await getAllEvents()
    return {
        props: {
            events
        },
        revalidate: 60
    }
}