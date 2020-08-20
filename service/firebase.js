import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { apiKey, projectId, authDomain } from '~/config'
if (!firebase.apps.length) {
  firebase.initializeApp({ apiKey, projectId, authDomain })
}
let db = firebase.firestore()
let fv = firebase.firestore.FieldValue;

const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
export { db, fv, firebase, googleAuthProvider }
