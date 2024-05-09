import { Routes, Route } from "react-router-dom";

import './App.css';
import Intro from './pages/intro/Intro.js'
import Main from './pages/main/Main.js';
import NearbySearch from './pages/nearbySearch/NearbySearch.js';
import RegionSearch from './pages/regionSearch/RegionSearch.js'
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
