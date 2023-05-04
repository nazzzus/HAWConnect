import './App.css';
//components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
//pages
import Home from './pages/Home';
import Kurse from './pages/Kurse';
import Bibliothek from './pages/Bibliothek';
import Planer from './pages/Planer';
import Einstellungen from './pages/Einstellungen';
import Profil from './pages/Profil';
import Login from './pages/Login';
import Mensa from './pages/Mensa';
//helpers
import BibList from './helpers/BibList';
import Kalender from './helpers/Kalender';
import Stundenplan from './helpers/Stundenplan';
import {BrowserRouter as Router, Route, Routes as Switch} from 'react-router-dom';






function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact element={<Home/>} />
          <Route path='/Planer' exact element={<Planer/>} />
          <Route path='/Bibliothek' exact element={<Bibliothek/>} />
          <Route path='/BibList' exact element={<BibList/>} />
          <Route path='/Login' exact element={<Login/>} />
          <Route path='/Kalender' exact element={<Kalender/>} />
          <Route path='/Stundenplan' exact element={<Stundenplan/>} />
          <Route path='/Kurse' exact element={<Kurse/>} />
          <Route path='/Mensa' exact element={<Mensa/>} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
