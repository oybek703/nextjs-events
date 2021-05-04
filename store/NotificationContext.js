import {createContext, useState} from 'react'

const NotificationContext = createContext({
    notification: null, // title, message, status
    showNotification(notificationData) {},
    hideNotification() {}
})

export function NotificationProvider({children}) {
    const [activeNotification, setActiveNotification] = useState(null)
    const context = {
        notification: activeNotification,
        showNotification(notificationData) {
            setActiveNotification(notificationData)
        },
        hideNotification() {
            setActiveNotification(null)
        }
    }
    return <NotificationContext.Provider value={context}>
        {children}
    </NotificationContext.Provider>
}

export default NotificationContext