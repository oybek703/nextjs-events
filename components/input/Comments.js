import {useContext, useEffect, useState} from 'react'

import CommentList from './CommentList'
import NewComment from './NewComment'
import classes from './comments.module.css'
import NotificationContext from '../../store/NotificationContext'

function Comments(props) {
    const notificationCtx = useContext(NotificationContext)
    const { eventId } = props

    const [showComments, setShowComments] = useState(false)

    function toggleCommentsHandler() {
        setShowComments((prevStatus) => !prevStatus)
    }

    async function addCommentHandler(commentData) {
        notificationCtx.showNotification({
            title: 'Saving...',
            message: 'Please wait, saving your comment...',
            status: 'pending'
        })
        try {

            const res = await fetch('/api/comments', {
                method: "POST",
                body: JSON.stringify(commentData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if(res.ok) {
                notificationCtx.showNotification({
                    title: 'Saved.',
                    message: 'Your comment saved successfully.',
                    status: 'success'
                })
            } else {
                const {message} = await res.json()
                throw new Error(message)
            }
        } catch (e) {
            notificationCtx.showNotification({
                title: 'Error',
                message: e.message || 'Something went wrong.',
                status: 'error'
            })
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
        <section className={classes.comments}>
            <button onClick={toggleCommentsHandler}>
                {showComments ? 'Hide' : 'Show'} Comments
            </button>
            {showComments && <NewComment eventId={eventId} onAddComment={addCommentHandler} />}
            {showComments && <CommentList eventId={eventId} />}
        </section>
    )
}

export default Comments