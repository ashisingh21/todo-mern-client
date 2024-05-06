import './layout.css';
import PropTypes from "prop-types";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ToastContainer } from 'react-toastify';
function Layout({ children }) {
    return (
        <>
            <Navbar />
            <main style={{ padding: '1.5rem 0' }}>{children}</main>
            <ToastContainer />
            <Footer />
        </>
    );
}

Layout.propTypes = {
    children: PropTypes.node.isRequired
};

export default Layout;