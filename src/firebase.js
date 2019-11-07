import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = firebase.initializeApp({
	apiKey: "AIzaSyCZv5iLRveHdFR7bVactjKEihz9wDDiwO4",
	authDomain: "todoist-clone-5c952.firebaseapp.com",
	databaseURL: "https://todoist-clone-5c952.firebaseio.com",
	projectId: "todoist-clone-5c952",
	storageBucket: "todoist-clone-5c952.appspot.com",
	messagingSenderId: "187962965480",
	appId: "1:187962965480:web:4dc7971de4b7e4fbf9385d"
})

export { firebaseConfig as firebase }