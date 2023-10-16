import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import MainScreen from './Components/MainScreen';
import Cards from './Components/Cards';

function App() {
  return (
    <Router>
      <Link to="/" className="link linkMain">Main Screen</Link>

      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/easy" element={<Cards difficulty={8} />} />
        <Route path="/medium" element={<Cards difficulty={12} />} />
        <Route path="/hard" element={<Cards difficulty={15} />} />
      </Routes>
    </Router>
  );
}

export default App;
