import React, { useState } from 'react'
import { storage } from '../Firebase'
import firebase from 'firebase/compat/app';
import { db } from '../Firebase';
import 'firebase/compat/firestore';
import './upload.css'

function Upload({username}) {

    const[caption, setCaption] = useState('')
    const[image, setImage] = useState(null)
    const[progress, setProgress] = useState(0)

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image)

        uploadTask.on('state_changed', (snapshot) => {
            const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            )
            setProgress(progress)
        },
        (error) => {
            console.log(error)
            alert(error.message)
        },
        () => {
            storage.ref('images').child(image.name).getDownloadURL()
            .then(url => {
                db.collection('data').add({
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    caption: caption,
                    src: url,
                    user: username
                })

                setProgress(0)
                setCaption('')
                setImage(null)
            })
        }
        )
    }

  return (
    <div className='imageUpload'>
        <progress className='progress' value={progress} max='100' />
        <input type="text" placeholder='enter a caption' value={caption} onChange={e => setCaption(e.target.value)}/>
        <input type="file" onChange={handleChange} />
        <button onClick={handleUpload}>Upload</button>
    </div>
  )
}

export default Upload