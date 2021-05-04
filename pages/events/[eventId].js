import {Fragment} from 'react'
import EventSummary from '../../components/event-detail/event-summary'
import EventLogistics from '../../components/event-detail/event-logistics'
import EventContent from '../../components/event-detail/event-content'
import {getFeaturedEvents} from '../../helpers/api-util'
import {useRouter} from 'next/router'
import Head from 'next/head'
import Comments from '../../components/input/Comments'

const EventDetail = ({event}) => {
    const {isFallback} = useRouter()
    if(isFallback) {
        return <div className='center'>
            <Head>
                <title>Please wait...</title>
            </Head>
            <p>Loading...</p>
        </div>
    }
    return (
        <Fragment>
            <Head>
                <title>{event.title}</title>
                <meta name='description' content={event.description}/>
            </Head>
            <EventSummary title={event.title}/>
            <EventLogistics
                date={event.date}
                address={event.location}
                image={event.image}
                imageAlt={event.title}/>
            <EventContent>
                <p>{event.description}</p>
            </EventContent>
            <Comments eventId={event.id} />
        </Fragment>
    )
}

export default EventDetail

export async function getStaticProps(context) {
    const {params: {eventId}} = context
    const res = await fetch(`https://nextjs-8bf06-default-rtdb.firebaseio.com/events/${eventId}.json`)
    const data = await res.json()
    return {
        props: {
            event: data
        },
        revalidate: 30
    }
}

export async function getStaticPaths() {
    const events = await getFeaturedEvents()
    const paths = events.map(e => ({params: {eventId: e.id}}))
    return {
        paths,
        fallback: true
    }
}