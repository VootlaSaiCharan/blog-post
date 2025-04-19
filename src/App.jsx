import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import BlogList from './pages/Blog/BlogList';
import BlogDetail from './pages/Blog/BlogDetail';
import BlogCreate from './pages/Blog/BlogCreate';
import BlogEdit from './pages/Blog/BlogEdit';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blogs" element={<BlogList />} />
            <Route path="/blogs/:id" element={<BlogDetail />} />
            <Route path="/blogs/:id/edit" element={<BlogEdit />} />
            <Route path="/create" element={<BlogCreate />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
}

export default App;