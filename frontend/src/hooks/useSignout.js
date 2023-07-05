import { useAppContext } from "../context/appContext";

export function useSignout() {
  const { logout, setTasks } = useAppContext();

  const signout = async () => {
    // Remove User From Localstorage:
    localStorage.removeItem("user");

    // Dispatch Signout Action:
    logout();
    setTasks(null);
  };

  return { signout };
}
