import {Fragment, useContext} from 'react'
import MainHeader from './main-header'
import NotificationContext from '../../store/NotificationContext'
import Notification from '../ui/Notification'

const Layout = ({children}) => {
    const {notification} = useContext(NotificationContext)
    return (
        <Fragment>
            <MainHeader/>
            <main>
                {children}
            </main>
            {notification && <Notification
                title={notification.title}
                message={notification.message}
                status={notification.status}
            />
            }
        </Fragment>
    )
}

export default Layout