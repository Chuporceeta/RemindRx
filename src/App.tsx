import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import WelcomePage from './components/WelcomePage'
import CreateAccount from './components/CreateAcct'
import HomePage from './components/HomePage.tsx'
import EditMed from './components/EditMed.tsx'
import CreateMed from './components/CreateMed.tsx'
import EditAcct from './components/EditAcct.tsx';
import './App.css';

function App() {
  return (
    <Router> 
      <Routes> 
              <Route path="/" element={<WelcomePage/>}/>
              <Route path="/create-account" element={<CreateAccount/>}/>
              <Route path="/home" element={<HomePage/>} />
              <Route path="/create-med" element={<CreateMed/>}/>
              <Route path="/edit-med" element={<EditMed/>}/>
              <Route path="/edit-account" element={<EditAcct/>}/>
      </Routes>
    </Router>

  );
}

export default App; 