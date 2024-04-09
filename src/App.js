import { Routes, Route } from "react-router-dom";

import './App.css';
import Intro from './pages/Intro.js'
import Main from './pages/Main.js';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/main" element={<Main />}>
          </Route>
        </Routes>
    </div>
  );
}

export default App;
