export default function reducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    case "UPDATE-USER":
      return {
        ...state,
        user: action.payload,
      };
    case "DISPLAY-ALERT":
      return {
        ...state,
        showAlert: true,
        alertText: action.value,
      };
    case "CLEAR-ALERT":
      return {
        ...state,
        showAlert: false,
        alertText: "",
      };
    case "SHOW-USER-BAR":
      return {
        ...state,
        showUserBar: action.value,
      };
    case "ALL":
      return {
        ...state,
        tasksType: "all",
      };
    case "ACTIVE":
      return {
        ...state,
        tasksType: "active",
      };
    case "COMPLETED":
      return {
        ...state,
        tasksType: "completed",
      };
    case "SET-TASKS":
      return {
        ...state,
        tasks: action.payload,
      };
    case "CREATE-TASK":
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
      };
    case "DELETE-TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.payload._id),
      };
    case "DELETE-COMPLETED-TASKS":
      return {
        ...state,
        tasks: state.tasks.filter((task) => !task.completed),
      };
    case "UPDATE-TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id === action.payload._id
            ? { ...task, completed: !task.completed }
            : task
        ),
      };

    default: {
      return state;
    }
  }
}
