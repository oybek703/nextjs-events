import EventItem from './EventItem'
import classes from './eventList.module.css'

const EventList = ({items}) => {
    return (
        <ul className={classes.list}>
            {items.map(item => <EventItem
                key={item.id}
                id={item.id}
                image={item.image}
                location={item.location}
                title={item.title}
                date={item.date}/>)
            }
        </ul>
    )
}

export default EventList