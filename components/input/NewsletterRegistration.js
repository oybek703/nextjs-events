import classes from './newsletterRegistration.module.css'
import {useContext, useEffect, useRef, useState} from 'react'
import NotificationContext from '../../store/NotificationContext'

function NewsletterRegistration() {
    const notificationCtx = useContext(NotificationContext)
    const emailInputRef = useRef(null)
    const [validEmail, setValidEmail] = useState(true)
    async function registrationHandler(event) {
        event.preventDefault()
        const email = emailInputRef.current.value
        if(!email || !email.trim() || !email.includes('@')) {
            setValidEmail(false)
        } else {
            notificationCtx.showNotification({
                title: 'Registering user...',
                message: 'Please wait while loading...',
                status: 'pending'
            })
            try {
                const res = await fetch('/api/users', {
                    method: 'POST',
                    body: JSON.stringify({email}),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if(res.ok) {
                    emailInputRef.current.value = ''
                    setValidEmail(true)
                    notificationCtx.showNotification({
                        title: 'Registered.',
                        message: 'You are successfully registered for newsletters.',
                        status: 'success'
                    })
                } else {
                    const {error} = await res.json()
                    throw new Error(error)
                }

            } catch (e) {
                notificationCtx.showNotification({
                    title: 'Error.',
                    message: e.message || 'something went wrong',
                    status: 'error'
                })
            }
        }
    }
    useEffect(() => {
        if(notificationCtx.notification) {
            const timer = setTimeout(() => {
                notificationCtx.hideNotification()
            }, 3000)
            return () => {
                clearTimeout(timer)
            }
        }
    }, [notificationCtx.notification])
    return (
        <section className={classes.newsletter}>
            <h2>Sign up to stay updated!</h2>
            <form onSubmit={registrationHandler}>
                <div className={classes.control}>
                    <input
                        ref={emailInputRef}
                        type='email'
                        id='email'
                        placeholder='Your email'
                        aria-label='Your email'
                    />
                    <button>Register</button>
                </div>
            </form>
            {!validEmail && <i><hr/>Please enter your valid email address.</i>}
        </section>
    )
}

export default NewsletterRegistration