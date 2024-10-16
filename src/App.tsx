import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import WelcomePage from './components/WelcomePage'
import CreateAccount from './components/CreateAcct'
import HomePage from './components/HomePage.tsx'
import './App.css';

function App() {
  return (
    <Router> 
      <Routes> 
              <Route path="/" element={<WelcomePage />} />
              <Route path="/create-account" element={<CreateAccount />} />
              <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App; 