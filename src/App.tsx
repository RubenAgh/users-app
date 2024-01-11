import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Home from 'pages/Home';
import UserList from 'pages/UserList';
import NotFound from 'pages/NotFound';
import UserDetails from 'pages/UserDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-list" element={<UserList />} />
        <Route path="/user-list/:id" element={<UserDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
