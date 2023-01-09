import app from "./firebase/firebase.init";
import {getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth';
import { useState } from "react";
const auth=getAuth(app);
function App() {
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const [user,setUser]=useState({})

  let handleGoogleSignIn=()=>{
    signInWithPopup(auth,googleProvider)
    .then(result=>{
      console.log(result.user)
      setUser(result.user)
    })
    .catch(err=>console.error(err))
  }

  let handleSignOut=()=>{
    signOut(auth)
    .then(()=>setUser({}))
    .catch(err=>{
      console.error(err)
      setUser({})
    })
  }

  let handleGithubSignIn=()=>{
      signInWithPopup(auth,githubProvider)
    .then(result=>{
      console.log(result.user)
      setUser(result.user)
    })
    .catch(err=>console.error(err))
  }

  return (
    <div className="App">
      {
        user?.uid?<button onClick={handleSignOut}>Logout</button>
                   :
                    <>
                    <button onClick={handleGoogleSignIn}>Google</button>
                    <button onClick={handleGithubSignIn}>Github</button>
                    </>
      }
      {
        user?.uid && <>
        <h1>{user.displayName}</h1>
        <p>{user.email ||'N/A'}</p>
        <img src={user.photoURL} alt="" />
        </>
      }
      
    </div>
  );
}

export default App;
