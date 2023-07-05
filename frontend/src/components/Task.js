import CheckBox from "./CheckBox";
import { useAppContext } from "../context/appContext";

export default function Task(props) {
  const { deleteTask, updateTask, user } = useAppContext();

  const deleteHandler = async () => {
    const response = await fetch(`/api/tasks/${props.task._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    response.ok && deleteTask(json);
  };

  const completeTaskHandler = async () => {
    if (!user) return;

    const updatedTask = {
      taskName: props.task.taskName,
      completed: !props.task.completed,
    };

    const response = await fetch(`/api/tasks/${props.task._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(updatedTask),
    });

    const json = await response.json();

    response.ok && updateTask(json);
  };

  return (
    <div className="container">
      <CheckBox
        checked={props.task.completed}
        task={props.task}
        onClick={completeTaskHandler}
      />
      <input
        type="text"
        value={props.task.taskName}
        className={`${
          props.task.completed ? "check-input completed" : "check-input"
        }`}
        disabled
      />
      <svg
        onClick={deleteHandler}
        width="1.6rem"
        height="1.6rem"
        className="deleteTask"
        viewBox="0 0 19 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          id="Combined Shape"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18.2145 0.728582L17.486 0L9.10747 8.37849L0.729079 9.40322e-05L0.000497344 0.728676L8.37889 9.10707L0 17.486L0.728581 18.2145L9.10747 9.83565L17.4865 18.2146L18.215 17.4861L9.83605 9.10707L18.2145 0.728582Z"
          fill="#494C6B"
        />
      </svg>
    </div>
  );
}
