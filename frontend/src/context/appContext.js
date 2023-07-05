import reducer from "./reducer";
import React, { useContext, useEffect, useReducer } from "react";

const initialState = {
  showUserBar: false,
  showAlert: false,
  alertText: "",
  tasksType: "all",
  tasks: [],
  user: null,
};

const AppContext = React.createContext();

function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    user && dispatch({ type: "LOGIN", payload: user });
  }, []);

  // console.log("AuthContext state", state.user);

  const displayAlert = (alertText) => {
    dispatch({ type: "DISPLAY-ALERT", value: alertText });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => dispatch({ type: "CLEAR-ALERT" }), 2000);
  };

  const showUserBarHandler = (showUserBar) =>
    dispatch({ type: "SHOW-USER-BAR", value: !showUserBar });

  const showAllTasks = () => {
    dispatch({ type: "ALL" });
  };

  const showActiveTasks = () => {
    dispatch({ type: "ACTIVE" });
  };

  const showCompletedTasks = () => {
    dispatch({ type: "COMPLETED" });
  };

  const setTasks = (json) => {
    dispatch({ type: "SET-TASKS", payload: json });
  };

  const addNewTask = (json) => {
    dispatch({ type: "CREATE-TASK", payload: json });
  };

  const deleteTask = (json) => {
    dispatch({ type: "DELETE-TASK", payload: json });
  };

  const updateTask = (json) => {
    dispatch({ type: "UPDATE-TASK", payload: json });
  };

  const deleteCompletedTasks = (count) => {
    dispatch({ type: "DELETE-COMPLETED-TASKS", payload: count });
  };

  const login = (json) => {
    dispatch({ type: "LOGIN", payload: json });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const updateUserInfo = (json) => {
    dispatch({ type: "UPDATE-USER", payload: json });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        login,
        logout,
        setTasks,
        clearAlert,
        deleteTask,
        addNewTask,
        updateTask,
        showAllTasks,
        displayAlert,
        updateUserInfo,
        showActiveTasks,
        showUserBarHandler,
        showCompletedTasks,
        deleteCompletedTasks,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

const useAppContext = () => useContext(AppContext);
export { AppProvider, initialState, useAppContext };
