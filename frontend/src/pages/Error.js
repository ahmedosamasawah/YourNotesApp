import { Link } from "react-router-dom";
import img from "../assets/images/not-found.svg";

export default function Error() {
  return (
    <main className="error-page">
      <div>
        <img src={img} alt="not found" />
        <h3>Ohh! Page Not Found</h3>
        <p>We can't seem to find the page you're looking for!</p>
        <Link to="/">Back to Signup</Link>
      </div>
    </main>
  );
}
