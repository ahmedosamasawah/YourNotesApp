import { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";

export function useSignup() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const { login } = useAppContext();

  const signup = async (
    email,
    password,
    confirmPass,
    username,
    phone,
    birthday
  ) => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    const response = await fetch("/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        confirmPass,
        username,
        phone,
        birthday,
      }),
    });

    const json = await response.json();

    // // Omit confirmPass from the user object
    // const { confirmPass: omittedConfirmPass, ...userData } = json;

    if (!response.ok) {
      setIsLoading(null);
      setError(json.error);
    } else {
      // // save the user to Localstorage:
      // localStorage.setItem("user", JSON.stringify(userData));

      // Update Auth Context:
      login(json);
      setIsLoading(false);
      setSuccessMessage(json.message);
    }
  };

  const clearSuccessMessage = () => {
    setSuccessMessage(null);
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(clearSuccessMessage, 2000);

      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  return { signup, isLoading, error, successMessage };
}
