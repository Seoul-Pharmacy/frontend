import { Routes, Route } from "react-router-dom";

import './App.css';
import Intro from './pages/Intro.js'
import Main from './pages/Main.js';
import NearbySearch from './pages/NearbySearch.js';
import RegionSearch from './pages/RegionSearch.js'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/main" element={<Main />} />
          <Route path="/nearbysearch" element={<NearbySearch />} />
          <Route path="/regionsearch" element={<RegionSearch />} />
        </Routes>
    </div>
  );
}

export default App;
