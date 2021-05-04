import {useRouter} from 'next/router'
import EventList from '../../components/EventList'
import ResultsTitle from '../../components/results-title/results-title'
import ErrorAlert from '../../components/error-alert/error-alert'
import Button from '../../components/ui/Button'
import useSWR from 'swr'
import {useEffect, useState} from 'react'
import Head from 'next/head'

function FilteredEvents() {
    const {query: {slug: filterData}} = useRouter()
    const [events, setEvents] = useState([])
    const {data, error} = useSWR('https://nextjs-8bf06-default-rtdb.firebaseio.com/events.json')
    useEffect( () => {
        if(data) {
            const allEvents = []
            for (const key in data) {
                allEvents.push(data[key])
            }
            let filteredEvents = allEvents.filter((event) => {
                const eventDate = new Date(event.date)
                return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
            })
            setEvents(filteredEvents)
        }
    }, [data])
    if(!filterData || !data) return <p className='center'>Loading...</p>
    const [filteredYear, filteredMonth] = filterData
    const year = +filteredYear
    const month = +filteredMonth
    if(isNaN(year) || isNaN(month) || year > 2030 || year < 2021 || month < 1 || month > 12 || error) {
        return <div className='center'>
            <Head>
                <title>Invalid arguments...</title>
            </Head>
            <ErrorAlert>
                <p className='center'>Invalid filter data. Please adjust your values.</p>
                <Button link='/events'>Show All Events</Button>
            </ErrorAlert>
        </div>
    }
    if(!events.length) {
        return <div className='center'>
            <Head>
                <title>Events not found  on {month}/{year}</title>
            </Head>
            <ErrorAlert>
                <p>No events found.</p>
                <Button link='/events'>Show All Events</Button>
            </ErrorAlert>
        </div>
    }
    const date = new Date(year, month - 1)
    return <div>
        <Head>
            <title>Filtered Events</title>
            <meta name="description" content={`All events on ${date.toDateString()}}`}/>
        </Head>
        <ResultsTitle date={date}/>
        <EventList items={events}/>
    </div>
}

export default FilteredEvents

// export async function getServerSideProps(context) {
//     const { params: {slug} } = context
//     const [filteredYear, filteredMonth] = slug
//     const year = +filteredYear
//     const month = +filteredMonth
//     if(isNaN(year) || isNaN(month) || year > 2030 || year < 2021 || month < 1 || month > 12) {
//         return {
//             props: {
//                 hasError: true
//             }
//         }
//     }
//     const filteredEvents = await getFilteredEvents({year, month})
//     return {
//         props: {
//             filteredEvents,
//             year,
//             month
//         }
//     }
// }