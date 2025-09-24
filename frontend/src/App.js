import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import AddContent from './components/AddContent';
import ContentList from './components/ContentList';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-600 p-4">
          <ul className="flex space-x-4 text-white">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/add">Add Content</Link></li>
            <li><Link to="/list">Content List</Link></li>
          </ul>
        </nav>
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddContent />} />
            <Route path="/list" element={<ContentList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;