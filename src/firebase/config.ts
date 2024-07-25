import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
	apiKey: 'AIzaSyBoaGh4f5ztOQETLK_kUmlHCyVbEwGN4QQ',
	authDomain: 'finance-tracker-512ee.firebaseapp.com',
	projectId: 'finance-tracker-512ee',
	storageBucket: 'finance-tracker-512ee.appspot.com',
	messagingSenderId: '1000641526463',
	appId: '1:1000641526463:web:33f911413e3caa0d2f640a',
}

// init firebase app
initializeApp(firebaseConfig)

// init services
const database = getFirestore()

// init Authentication: projectAuth
const authenticate = getAuth()

// timestamp
//const timestamp = firebase.firestore.Timestamp

// //collection ref
// const colRef = collection(database, "make-recipe");

// //get collection data : all documents
// getDocs(colRef).then((snapshot) => console.log(snapshot.docs));

export { database, authenticate }
