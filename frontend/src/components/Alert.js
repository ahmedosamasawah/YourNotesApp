import { useAppContext } from "../context/appContext";

export default function Alert() {
  const { alertText } = useAppContext();
  return <div className="alert">{alertText}</div>;
}
