import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
import 'colors';

export const connectFB = () => {
    const firebaseConfig = {
        apiKey: process.env.apiKey,
        authDomain: process.env.authDomain,
        databaseURL: process.env.databaseURL,
        projectId: process.env.projectId,
        storageBucket: process.env.storageBucket,
        messagingSenderId: process.env.messagingSenderId,
        appId: process.env.appId
    };

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
        console.log(`firebase is here`.bold.blue);
    }

    return firebase;
}