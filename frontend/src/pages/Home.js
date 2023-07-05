import Task from "../components/Task";
import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import TaskForm from "../components/TaskForm";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import background from "../assets/images/Dash-Cover.png";
import { useSignout } from "../hooks/useSignout";
import { useTranslation } from "react-i18next";

const Home = () => {
  const [t, i18n] = useTranslation("global");
  const body = document.getElementById("root");
  const { signout } = useSignout();
  const {
    user,
    tasks,
    setTasks,
    tasksType,
    showUserBar,
    showAllTasks,
    showActiveTasks,
    showCompletedTasks,
    deleteCompletedTasks,
  } = useAppContext();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("/api/tasks/", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      response.ok && setTasks(json);
    };
    user && fetchTasks();
  }, [setTasks, user]);

  const handleClearCompletedTasks = async () => {
    try {
      const response = await fetch("/api/tasks", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (response.ok) {
        const json = await response.json();
        deleteCompletedTasks(json.deletedCount);
      } else {
        console.log("Error clearing completed tasks");
      }
    } catch (error) {
      console.log("Error clearing completed tasks:", error);
    }
  };

  const totalTasks = tasks?.length;
  const completeTasks = tasks?.filter((task) => task.completed).length;

  const logoutBtnHandler = () => {
    signout();
    body.classList.remove("dark-mode");
    navigate("/");
  };
  const modifyBtnHandler = () => navigate("/editUser");

  return (
    <section className="dash-sec">
      <NavBar />
      <div
        className="dash-bg-img-box"
        style={{ backgroundImage: `url(${background})` }}
      >
        {showUserBar && (
          <div className="to-position">
            <div className="user-bar">
              {i18n.language === "en" && (
                <h3 className="user-name">
                  {t("Hi")} {user && (user.username || user.user.username)}
                </h3>
              )}
              {i18n.language === "ar" && (
                <h3 className="user-name">
                  {user && (user.username || user.user.username)} {t("Hi")}
                </h3>
              )}
              <button onClick={modifyBtnHandler} className="back-btn btn">
                {t("ModifyUserInformation")}
              </button>
              <button onClick={logoutBtnHandler} className="form-btn btn">
                {t("logout")}
              </button>
            </div>
          </div>
        )}
        <TaskForm />
      </div>
      <div className="tasks-box">
        <main className="tasks-list">
          {tasks &&
            tasks
              .filter((task) => {
                if (tasksType === "all") {
                  return true;
                } else if (tasksType === "completed") {
                  return task.completed;
                } else {
                  return !task.completed;
                }
              })
              .map((task) => <Task key={task._id} id={task._id} task={task} />)}
        </main>

        {totalTasks > 0 && (
          <main className="tasks-list-info">
            <p>
              {totalTasks - completeTasks} {t("itemsLeft")}
            </p>
            <div>
              <button
                className={`btn typeBtn ${tasksType === "all" ? "active" : ""}`}
                onClick={showAllTasks}
              >
                {t("tasksDataAll")}
              </button>
              <button
                className={`btn typeBtn ${
                  tasksType === "active" ? "active" : ""
                }`}
                onClick={showActiveTasks}
              >
                {t("tasksDataActive")}
              </button>
              <button
                className={`btn typeBtn ${
                  tasksType === "completed" ? "active" : ""
                }`}
                onClick={showCompletedTasks}
              >
                {t("tasksDataCompleted")}
              </button>
            </div>
            <button className="btn" onClick={handleClearCompletedTasks}>
              {t("tasksDataDelete")}
            </button>
          </main>
        )}
      </div>
    </section>
  );
};

export default Home;
