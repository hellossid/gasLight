import React, { useEffect, useState } from 'react'
// import Navbar from '../Components/Navbar'
import './home.css'
import Post from '../Components/Post'
import { db } from '../Firebase'
// import Pop from '../Components/Pop'
import Upload from '../Components/Upload'
import { auth } from '../Firebase'
import Modal from '@mui/material/Modal'



function Home() {

    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState();
    const [openSignIn, setOpenSignIn] = useState(false)
    const [password, setPassword] = useState();
    const [username, setUsername] = useState();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                console.log(authUser)
                setUser(authUser)
            }
            else {
                setUser(null)
            }
        })
        return () => {
            unsubscribe()
        }
    },
        [user, username]
    )


    const signUp = (e) => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                return authUser.user.updateProfile({
                    displayName: username
                })
            })
            .catch((error) => alert(error.message))

        setOpen(false)
    }

    const signIn = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password)
            .catch((error) => alert(error.message))

        setOpenSignIn(false)
    }

    const [posts, setPosts] = useState([])

    useEffect(() => {
        db.collection('data').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                post: doc.data()
            })));
        })
    }, []);

    return (

        <div className='app'>
            <div className="app_header">
                <i className=" app_headerLogo fa-sharp fa-solid fa-fire-burner"></i>
                {user ? (<button onClick={() => auth.signOut()}>Logout</button>) :
                    (
                        <div className="loginContainer">
                            <button onClick={() => setOpenSignIn(true)}>Sign in</button>
                            <button onClick={() => setOpen(true)}>Sign up</button>
                        </div>)}
            </div>
            <div>
                <div>
                    <Modal open={open} onClose={() => setOpen(false)}>
                        <div className='mod'>
                            <form className='signUp'>
                                <center>
                                    <i className=" app_headerLogo fa-sharp fa-solid fa-fire-burner"></i>
                                </center>
                                <input type="text" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                                <input type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                                <input type="text" placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)} />
                                <button onClick={signUp}>Sign Up</button>
                            </form>
                        </div>
                    </Modal>

                    <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
                        <div className='mod'>
                            <form className='signUp'>
                                <center>
                                    <i className=" app_headerLogo fa-sharp fa-solid fa-fire-burner"></i>
                                </center>
                                <input type="text" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                                <input type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                                <button onClick={signIn}>Sign In</button>
                            </form>
                        </div>
                    </Modal>
                </div>
            </div>
            <div className="app_post">
                {
                    posts.map(({ id, post }) => {
                        return (
                            <Post key={id} postId={id} user1={user} user={post.user} src={post.src} caption={post.caption} />
                        )
                    })
                }
            </div>
            <div>
                {user?.displayName ? (<Upload username={user.displayName} />) :
                    (<h3>You need to login to upload media</h3>)}
            </div>
        </div>
    )
}

export default Home