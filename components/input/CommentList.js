import classes from './commentList.module.css'
import {useEffect, useState} from 'react'

function CommentList({eventId}) {
    const [loading, setLoading] = useState(true)
    const [comments, setComments] = useState([])
    useEffect( () => {
        setLoading(true)
        fetch('/api/comments')
            .then(res => res.json())
            .then(data => {
                setLoading(false)
                const {comments: allComments} = data
                const filteredComments = allComments.filter(c => c.eventId === eventId)
                setComments(filteredComments)
            })
    }, [])
    return (
        <ul className={classes.comments}>
            {loading ? <p className='center'>Loading...</p>
                : !comments.length
                ? <p className='center'>No comments yet.</p>
                : comments.map(c => <li key={c.id}>
                    <p>{c.text}</p>
                    <div>
                        By <address>{c.name}</address>
                    </div>
                </li>)
            }
        </ul>
    )
}

export default CommentList