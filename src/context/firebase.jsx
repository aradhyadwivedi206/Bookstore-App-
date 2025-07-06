import { createContext, useContext,useState,useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword ,GoogleAuthProvider,signInWithPopup,onAuthStateChanged} from "firebase/auth";
import firebase from "firebase/compat/app";

import { getFirestore,collection,addDoc ,getDocs,doc,getDoc, query,where} from "firebase/firestore";
import { getStorage ,ref,uploadBytes,getDownloadURL} from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDCj1NJELWmvxRGueF3sJxah_yXyZpRSO0",
  authDomain: "bookify-24e96.firebaseapp.com",
  projectId: "bookify-24e96",
  storageBucket: "bookify-24e96.firebasestorage.app",
  messagingSenderId: "918734875737",
  appId: "1:918734875737:web:a7289c44812f2cd5ee9548"
};

const FirebaseContext=createContext(null);
export const useFirebase=()=>useContext(FirebaseContext);
const FirebaseApp=initializeApp(firebaseConfig);

export const firebaseAuth=getAuth(FirebaseApp);
const googleProvider=new GoogleAuthProvider();
const firestore=getFirestore(FirebaseApp);
const storage=getStorage(FirebaseApp);

export const FirebaseProvider=(props)=>{

    const [user,setUser]=useState(null);

    useEffect(()=>{
   onAuthStateChanged(firebaseAuth,user=>{
    if(user)setUser(user);
    else setUser(null);
   })
    },[])

    const signupUserWithEmailAndPassword=(email,password)=>{
        return createUserWithEmailAndPassword(firebaseAuth,email,password);
    }

    const signInUserWithEmailAndPassword=(email,password)=>{
        return signInWithEmailAndPassword(firebaseAuth,email,password);
    }

    const signinWithGoogle=()=>signInWithPopup(firebaseAuth,googleProvider);


      const isLoggedIn=user?true:false;
      console.log(user);

      const handelCreateNewListing=async(name,isbn ,price,coverPic)=>{
            //  const imgref=ref(storage,`uploads/images/${Date.now()}${coverPic.name}`);
            //  const uploadResult=await uploadBytes(imgref,coverPic);
             await addDoc(collection(firestore,'books'),{
               name,
               isbn,
               price,
            //   imageURL:uploadResult.ref.fullPath,
              userID:user.uid,
              userEmail:user.email,
              displayName:user.displayName,
            //   photoURL:user.photoURl,

              })

      };


        const getImgURL=(path)=>{
            return getDownloadURL(ref(storage,path));
        }
      const listAllBooks=()=>{
        return getDocs(collection(firestore,"books"));
      }

      const getBooksById=async(id)=>{
        const docref=doc(firestore,'books',id);
        const result=await getDoc(docref);
        return result;
      }

      const placeOrder=async(bookId,qty)=>{
        const collectionRef=collection(firestore,"books",bookId,"orders");
        const result=await addDoc(collectionRef,{
          userID:user.uid,
              userEmail:user.email,
              displayName:user.displayName,
              qty:Number(qty),
        });
return result;
      }

      const fetchMyBooks = async () => {
  if (!user) return null;
  const collectionRef = collection(firestore, "books");
  const q = query(collectionRef, where("userID", "==", user.uid));
  const result = await getDocs(q);
  return result;
};

      const getOrder=async(bookId)=>{
        const collectionRef=collection(firestore,'books',bookId,'orders');
        const result =await getDocs(collectionRef);
        return result;
      }
    
 return(
    <FirebaseContext.Provider value={{signupUserWithEmailAndPassword,signInUserWithEmailAndPassword,signinWithGoogle,isLoggedIn,handelCreateNewListing,listAllBooks,getImgURL,getBooksById,placeOrder,fetchMyBooks,user,getOrder}}>
        {props.children}
    </FirebaseContext.Provider>
 )
}