import Layout from '../components/layout/Layout';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <Layout>
      <div className="container-fluid px-4">
        <div className="row">
          <div className="col-md-6">
            <h2 className="fw-bold h1 text-primary mb-4">About Us</h2>
            <p className="fw-bold mb-2">Welcome to our todo list app! This app helps you stay organized and manage your tasks efficiently.</p>
            <p>With our intuitive interface and powerful features, you can easily create, organize, and track your tasks, ensuring nothing falls through the cracks.</p>
            <p>Whether you&apos;re a busy professional, a student, or just someone looking to stay on top of their daily responsibilities, our todo list app is designed to meet your needs.</p>
          
            <p>Whether you&apos;re a busy professional, a student, or just someone looking to stay on top of their daily responsibilities, our todo list app is designed to meet your needs.</p>
 
            <p>With our intuitive interface and powerful features, you can easily create, organize, and track your tasks, ensuring nothing falls through the cracks.</p>
            <p>Whether you&apos;re a busy professional, a student, or just someone looking to stay on top of their daily responsibilities, our todo list app is designed to meet your needs.</p>
            <Link to="/tasks">
                <button className="btn btn-theme-primary mt-4">
                  Start Managing Tasks
                </button>
              </Link>
          </div>
          <div className="col-md-6">
            <img src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=1939&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Todo List" className="img-fluid rounded" />
          </div>
        </div>
      
      
      </div>
    </Layout>
  );
}

export default About;
