import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import WelcomePage from './components/WelcomePage'
import CreateAccount from './components/CreateAcct'
import './App.css';

function App() {
    console.log('Requesting permission...');
    Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
            console.log('Notification permission granted.');
        }
    });

    const firebaseConfig = {
        apiKey: "AIzaSyD076ENRDRauDUNj0bTZURJDlf26LmJmA0",
        authDomain: "remindrx-1c8dd.firebaseapp.com",
        projectId: "remindrx-1c8dd",
        storageBucket: "remindrx-1c8dd.appspot.com",
        messagingSenderId: "966406512713",
        appId: "1:966406512713:web:1f46bc061b0249e17d5f98"
    };
    const app = initializeApp(firebaseConfig);
    const messaging = getMessaging();
    getToken(messaging, { vapidKey: 'BBwMxByKR54lgFmD865aGRvDM9vLngLjZqeAgQ_qKcAdzp2VA3HZF7t5XXoXs87kdfSG2antBI7KNLYoqt3rOGo' }).then((currentToken) => {
        if (currentToken) {
            console.log(currentToken);
        } else {
            // Show permission request UI
            console.log('No registration token available. Request permission to generate one.');
            // ...
        }
    }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // ...
    });

    return (
        <Router>
            <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/create-account" element={<CreateAccount />} />
            </Routes>
        </Router>
    );
}

export default App; 