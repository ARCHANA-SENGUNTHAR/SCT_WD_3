import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';

import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import MyPerformance from './pages/MyPerformance';
import TimedTest from './pages/TimedTest';
import ViewProfile from './pages/ViewProfile';

import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminQuestionForm from './pages/AdminQuestionForm';
import AdminProfile from './pages/AdminProfile';
import EditQuestion from './pages/EditQuestion';

function App() {
  return (
    <div className="app-wrapper">
      <Router>
        <div className="main-content">
          <Routes>
            {/* User + Admin Login Layout */}
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/quiz/:level/:topic" element={<Quiz />} />
              <Route path="/result" element={<Result />} />
              <Route path="/performance" element={<MyPerformance />} />
              <Route path="/level/:level/test" element={<TimedTest />} />
              <Route path="/profile" element={<ViewProfile />} />
              <Route path="/admin/login" element={<AdminLogin />} />
            </Route>

            {/* Admin Layout */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="add" element={<AdminQuestionForm />} />
              <Route path="edit/:id" element={<EditQuestion />} />
              <Route path="profile" element={<AdminProfile />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
