import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";

const Homepage = () => {
  return (
    <>
      <Layout>
        <div className="homepage-wrapper">
          <div>
            <div className="col-md-6 m-auto text-center">
              <h1 className="text-primary fw-bold h1 mb-2">
                Welcome to TodoList App
              </h1>
              <p className=" mb-4 p-2">
                Simplify your life and boost productivity by managing all your
                tasks in one place. TodoListApp is a user-friendly task
                management solution designed to help you stay organized
                effortlessly. Whether youre juggling work projects, personal
                errands, or school assignments, our intuitive interface makes it
                easy to create, track, and prioritize tasks with ease.
              </p>
              <Link to="/tasks">
                <button className="btn btn-theme-primary">
                  Start Managing Tasks
                </button>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Homepage;
