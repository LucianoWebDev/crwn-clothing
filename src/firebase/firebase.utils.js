import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: 'AIzaSyDhrZgvO7KuCbEMsMaBQ-edCDtSJEJXCOA',
    authDomain: 'crwn-db-be42f.firebaseapp.com',
    databaseURL: 'https://crwn-db-be42f.firebaseio.com',
    projectId: 'crwn-db-be42f',
    storageBucket: 'crwn-db-be42f.appspot.com',
    messagingSenderId: '43257473322',
    appId: '1:43257473322:web:3c1a796b07749c9e6f9653',
    measurementId: 'G-CYF69YLHJK'
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return

    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const snapShot = await userRef.get()

    if (!snapShot.exists) {
        const { displayName, email } = userAuth
        const createdAt = new Date()

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message)
        }
    }

    return userRef
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
