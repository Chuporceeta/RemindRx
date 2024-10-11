import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import WelcomePage from './components/WelcomePage'
import CreateAccount from './components/CreateAcct'
import './App.css';

function App() {
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