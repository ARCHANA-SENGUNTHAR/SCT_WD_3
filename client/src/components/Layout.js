import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import './Layout.css'; // Make sure this file exists

const Layout = () => {
  return (
    <div className="layout-container">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
