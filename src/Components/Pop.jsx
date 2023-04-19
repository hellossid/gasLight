// import React from 'react'
// import Modal from '@mui/material/Modal'
// import './pop.css'
// import { useState, useEffect } from 'react';
// import { auth } from '../Firebase'

// function Pop() {
//   const [open, setOpen] = useState(false);
//   const [email, setEmail] = useState();
//   const [openSignIn, setOpenSignIn] = useState(false)
//   const [password, setPassword] = useState();
//   const [username, setUsername] = useState();
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((authUser) => {
//       if (authUser) {
//         console.log(authUser)
//         setUser(authUser)
//       }
//       else {
//         setUser(null)
//       }
//     })
//     return () => {
//       unsubscribe()
//     }
//   },
//     [user, username]
//   )


//   const signUp = (e) => {
//     e.preventDefault();
//     auth.createUserWithEmailAndPassword(email, password)
//       .then((authUser) => {
//         return authUser.user.updateProfile({
//           displayName: username
//         })
//       })
//       .catch((error) => alert(error.message))

//     setOpen(false)
//   }

//   const signIn = (e) => {
//     e.preventDefault();
//     auth.signInWithEmailAndPassword(email, password)
//       .catch((error) => alert(error.message))

//     setOpenSignIn(false)
//   }

//   return (
//     <div>
//       {user ? (<button onClick={() => auth.signOut()}>Logout</button>) :
//         (
//           <div className="loginContainer">
//             <button onClick={() => setOpenSignIn(true)}>Sign in</button>
//             <button onClick={() => setOpen(true)}>Sign up</button>
//           </div>)}
//       <div>
//         <Modal open={open} onClose={() => setOpen(false)}>
//           <div className='mod'>
//             <form className='signUp'>
//               <center>
//                 <i className=" app_headerLogo fa-sharp fa-solid fa-fire-burner"></i>
//               </center>
//               <input type="text" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
//               <input type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
//               <input type="text" placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)} />
//               <button onClick={signUp}>Sign Up</button>
//             </form>
//           </div>
//         </Modal>

//         <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
//           <div className='mod'>
//             <form className='signUp'>
//               <center>
//                 <i className=" app_headerLogo fa-sharp fa-solid fa-fire-burner"></i>
//               </center>
//               <input type="text" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
//               <input type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
//               <button onClick={signIn}>Sign In</button>
//             </form>
//           </div>
//         </Modal>
//       </div>
//     </div>
//   )
// }

// export default Pop