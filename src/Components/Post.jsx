import React, { useEffect, useState } from 'react'
import './post.css'
import { Avatar } from '@mui/material'
import { db } from '../Firebase';
import 'firebase/compat/firestore';
import firebase from 'firebase/compat/app';

function Post({user,src,caption,postId,user1}) {

    const[comments, setComments] = useState([])
    const[comment,setComment] = useState('')
    
    useEffect(() => {
        let unsubscribe;
        if (postId) {
            unsubscribe = db.collection('data').doc(postId)
            .collection('comments').orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
                setComments(snapshot.docs.map((doc) => doc.data()))
            })
        }

        return () => {
            unsubscribe();
        }
    }, [postId])

    const postComment = (e) => {
        e.preventDefault();

        db.collection('data').doc(postId).collection('comments').add({
            text: comment,
            username: user1.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setComment('');
    }

    return (
        <div className='post'>
            <div className="post_header">
                <Avatar className='post_avatar' alt='img' src='/static/images/avatar/1.jpg' />
                <h3>{user}</h3>
            </div>

            <img className='post_image' src={src} alt=".img" />
            <h4 className='post_text'><strong>{user}</strong> {caption}</h4>

            <div className='post_comments'>
                {comments.map((comment) => {
                    return(
                    <p>
                        <strong>{comment.username}</strong> {comment.text}
                    </p>
                    )
                })}
            </div>

            {user1 && (
            <form className='comment_box'>
                <input className='post_input' type="text" placeholder='add a comment'
                value={comment} onChange={(e) => setComment(e.target.value)} />
                <button className='post_button' disabled={!comment} type='submit'
                onClick={postComment}>Post</button>
            </form>) }
            
        </div>
    )
}

export default Post