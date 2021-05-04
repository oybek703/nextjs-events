import classes from './eventItem.module.css'
import DateIcon from './icons/date-icon'
import AddressIcon from './icons/address-icon'
import Button from './ui/Button'
import ArrowRightIcon from './icons/arrow-right-icon'
import Image from 'next/image'

const EventItem = ({image, id, location, title, date}) => {
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
    const formattedAddress = location.replace(', ', '\n')
    return (
        <li className={classes.item}>
            <Image src={`/${image}`} alt={title} width={400} height={250}/>
            <div className={classes.content}>
                <div className={classes}>
                    <h2>{title}</h2>
                    <div className={classes.date}>
                        <DateIcon/>
                        <time>{formattedDate}</time>
                    </div>
                    <div className={classes.address}>
                        <AddressIcon/>
                        <address>
                            {formattedAddress}
                        </address>
                    </div>
                </div>
                <div className={classes.actions}>
                    <Button link={`/events/${id}`}>
                        <span>{title}</span>
                        <span className={classes.icon}><ArrowRightIcon/></span>
                    </Button>
                </div>
            </div>
        </li>
    )
}

export default EventItem