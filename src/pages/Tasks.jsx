import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { toast } from "react-toastify";
const Tasks = () => {
  const [allTask, setAllTask] = useState([]);
  const [allCategory, setAllCategory] = useState([]);
  const [taskMode, setTaskMode] = useState("add");
  const [categoryMode, setCategoryMode] = useState("add");

  const [task, setTask] = useState({
    title: "",
    description: "",
    category: { id: "", name: "" },
    id: "",
    status: 0,
  });
  const [category, setCategory] = useState({
    name: "",
    id: "",
  });

  const fetchAllTask = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/task/all-task`
      );
      const updatedTasks = res.data.task.map((task) => ({
        ...task,
        category: task.category
          ? {
              id: task.category._id ? task.category._id : "",
              name: task.category.name ? task.category.name : "No category",
            }
          : {
              id: "",
              name: "Category Deleted",
            },
      }));

      setAllTask(updatedTasks);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchAllCategory = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/category/all-category`
      );

      setAllCategory(res.data.allCategory);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchAllTask();

    fetchAllCategory();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    // Send the data using the values from task

    try {
      if (!task.title || !task.description) {
        toast.error("Please fill in all fields");
        return;
      }

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/task/add-task`,
        task
      );
      res.data.success && toast.success(res.data.message);
      // Reset the form fields
      setTask({
        title: "",
        description: "",
        category: "",
        status: 0,
      });
      fetchAllTask();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    // Send the data using the values from task

    try {
      if (!category.name) {
        toast.error("Please provide a category name");
        return;
      }

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/category/add-category`,
        category
      );
      res.data.success && toast.success(res.data.message);
      // Reset the form fields
      setCategory({
        name: "",
      });
      fetchAllCategory();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/task/update-task/${task.id}`,
        task
      );
      res.data.success && toast.success(res.data.message);
      fetchAllTask();
      setTaskMode("add");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/category/update-category/${
          category.id
        }`,
        category
      );
      res.data.success && toast.success(res.data.message);
      fetchAllCategory();
      setCategoryMode("add");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleFetchForUpdateTask = async (id) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/task/single-task/${id}`
      );
      const currentTaskData = res.data.task;
      setTask({
        id: currentTaskData._id,
        title: currentTaskData.title,
        description: currentTaskData.description,
        category: currentTaskData.category,
      });
      setTaskMode("update");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleFetchForUpdateCategory = async (id) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/category/single-category/${id}`
      );
      const currentCategoryData = res.data.category;
      setCategory({
        id: currentCategoryData._id,
        name: currentCategoryData.name,
      });
      setCategoryMode("update");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/task/delete-task/${id}`
      );
      res.data.success && toast.success(res.data.message);
      fetchAllTask();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/category/delete-category/${id}`
      );
      res.data.success && toast.success(res.data.message);

      fetchAllCategory();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleTaskChange = (e) => {
    setTask({
      ...task,
      [e.target.id]: e.target.value,
    });
  };

  const handleCategoryChange = (e) => {
    setCategory({
      ...category,
      [e.target.id]: e.target.value,
    });
  };

  const handleUpdateTaskStatus = async (id) => {
    try {
      // Fetch the task
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/task/single-task/${id}`
      );
      const taskData = res.data.task;

      // Update task status
      const updatedTask = { status: taskData.status === 0 ? 1 : 0 };
      const resNew = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/task/update-task-status/${
          taskData._id
        }`,
        updatedTask
      );
      resNew.data.success && toast.success(resNew.data.message);
      // Update UI or perform other tasks
      fetchAllTask();
      setTaskMode("add");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Layout>
      <div className="container-fluid px-4">
        <div className="row">
          <div className="col-md-4 ">
            <form
              className="form-container"
              onSubmit={taskMode === "add" ? handleAddTask : handleUpdateTask}
            >
              <h3 className="fw-bold h3 text-primary mb-3">Add a Task</h3>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={task.title}
                  onChange={handleTaskChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  rows="3"
                  value={task.description}
                  onChange={handleTaskChange}
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="category" className="form-label">
                  Category
                </label>
                {allCategory.length > 0 ? (
                  <select
                    className="form-select"
                    id="category"
                    value={task.category.id}
                    onChange={handleTaskChange}
                  >
                    <option value="">Select a category...</option>
                    {allCategory.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div>
                    <select className="form-select" disabled>
                      <option value="">No categories available</option>
                    </select>
                    <p className="text-muted mt-2">Please add a category.</p>
                  </div>
                )}
              </div>
              <button type="submit" className="btn btn-theme-primary">
                {taskMode === "add" ? "Add Task" : "Update Task"}
              </button>
            </form>

            <form
              className=" mt-4 form-container"
              onSubmit={
                categoryMode === "add"
                  ? handleAddCategory
                  : handleUpdateCategory
              }
            >
              <h3 className="fw-bold h3 text-primary mb-3">Add a Category</h3>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={category.name}
                  onChange={handleCategoryChange}
                />
              </div>

              <button type="submit" className="btn btn-theme-primary">
                {categoryMode === "add" ? "Create" : "Update"} Category
              </button>
            </form>
          </div>

          <div className="col-md-8">
            <div className="shadow fw-bold p-3 mb-5 bg-white rounded text-center">
              Total Task : {allTask.length} | Completed Task :{" "}
              <span style={{ color: "green" }}>
                {allTask.filter((task) => task.status === 1).length}
              </span>{" "}
              | Pending Task :{" "}
              <span style={{ color: "red" }}>
                {allTask.filter((task) => task.status === 0).length}
              </span>
            </div>
            <h3 className="fw-bold h3 text-primary mt-4 mb-3">All Tasks</h3>
            <table className="table table-hover table-bordered ">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Task Name</th>
                  <th>Task Category</th>
                  <th>Task Description</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(allTask) &&
                  allTask.map((task, index) => (
                    <tr
                      style={{ background: task.status === 1 ? "#ebffee" : "" }}
                      key={index}
                    >
                      <td className="px-3">{index + 1}</td>
                      <td
                        style={{
                          textDecoration:
                            task.status === 1 ? "line-through" : "",
                        }}
                      >
                        {task.title}
                      </td>

                      <td>{task.category.name}</td>

                      <td
                        style={{
                          textDecoration:
                            task.status === 1 ? "line-through" : "",
                        }}
                      >
                        {task.description}
                      </td>
                      <td>
                        <input
                          style={{ width: "30px", height: "16px" }}
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckChecked"
                          checked={task.status !== 0}
                          onChange={() => {
                            handleUpdateTaskStatus(task._id);
                          }}
                        />
                      </td>
                      <td>
                        <button
                          onClick={() => handleFetchForUpdateTask(task._id)}
                          className="mx-2"
                        >
                          <i
                            className="fa-solid fa-pen-nib"
                            style={{ color: "#E9B824" }}
                          ></i>
                        </button>
                        <button
                          onClick={() => handleDeleteTask(task._id)}
                          className="mx-2"
                        >
                          <i
                            className="fa-solid fa-trash-can"
                            style={{ color: "#D83F31" }}
                          ></i>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <h3 className="fw-bold h3 text-primary mb-3">All Category</h3>
            <table className=" table table-hover table-bordered">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Category Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(allCategory) && allCategory.length > 0 ? (
                  allCategory.map((cat, index) => (
                    <tr key={index}>
                      <td className="px-3">{index + 1}</td>
                      <td>{cat.name}</td>
                      <td>
                        <button
                          onClick={() => handleFetchForUpdateCategory(cat._id)}
                          className="mx-2"
                        >
                          <i
                            className="fa-solid fa-pen-nib"
                            style={{ color: "#E9B824" }}
                          ></i>
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(cat._id)}
                          className="mx-2"
                        >
                          <i
                            className="fa-solid fa-trash-can"
                            style={{ color: "#D83F31" }}
                          ></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="px-2" colSpan="3">
                      No category found!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Tasks;
