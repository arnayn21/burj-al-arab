import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContex } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';

const Login = () => {

    if(firebase.apps.length === 0 ){
        firebase.initializeApp(firebaseConfig);
    }

    const [loggedInUser , setLoggedInUser] = useContext(UserContex)

    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const handleGoogleSignIn = () =>{

        var provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider)
        .then((result) => {
               const {displayName , email} = result.user ;
                const signInUser = {
                    name : displayName,
                    email : email 
                }
                    setLoggedInUser(signInUser)
                    storeAuthToken();
                    history.replace(from)
                    
    // ...
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
            const storeAuthToken = () =>{
                firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
                .then(function(idToken) {
                    sessionStorage.setItem('token' , idToken);
                  }).catch(function(error) {
                    // Handle error
                  });
            }
    }
    return (
        <div>
            <h1>This is Login</h1>

            <button onClick={handleGoogleSignIn}>Sign In With Google</button>
        </div>
    );
};

export default Login;