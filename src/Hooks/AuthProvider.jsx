import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../firebase/firebase.config";


export const  AuthContext = createContext(null)
const auth = getAuth(app);
const AuthProvider = ({children}) => {
 const [user,setUser] = useState(null)
 const [loading, setLoading] = useState(true)

 const googleProvider = new GoogleAuthProvider()

const googleSign = () =>{
    setLoading(true)
 return signInWithPopup( auth,googleProvider)
}
 const createUser = (email,password) =>{
    setLoading(true)
    return createUserWithEmailAndPassword(auth,email,password)
 }


 const signIn = (email,password) =>{
    setLoading(true)
    return signInWithEmailAndPassword(auth,email,password)
  
 }

 useEffect(()=>{
    const unsubcribe = onAuthStateChanged(auth,(currentUser)=>{
        // console.log('state change')
        setUser(currentUser)
        setLoading(false)
    })
    return(()=>{
        return unsubcribe()
    }) 
 },[])


 const handleUpdateProfile = (name,photo) =>{
    return updateProfile(auth.currentUser, {
        displayName: name, photoURL: photo
    })
 }
 const logout = () =>{
    return signOut(auth)
 }
    const authInfo ={
        user,
        createUser,
        googleSign,
        signIn,
        logout,
        loading,
        handleUpdateProfile
    }
    return (
        <AuthContext.Provider value={authInfo}>
        {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;