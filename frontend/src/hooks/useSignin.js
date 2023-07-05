import { useState } from "react";
import { useAppContext } from "../context/appContext";

export function useSignin() {
  const [errorSignin, setErrorSignin] = useState(null);
  const [isLoadingSignin, setIsLoadingSignin] = useState(null);
  const { login } = useAppContext();

  const signin = async (
    email,
    password,
    confirmPass,
    username,
    phone,
    birthday
  ) => {
    setIsLoadingSignin(true);
    setErrorSignin(null);

    const response = await fetch("/api/user/signin", {
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

    // Omit confirmPass from the user object
    const { confirmPass: omittedConfirmPass, ...userData } = json;

    if (!response.ok) {
      setIsLoadingSignin(null);
      setErrorSignin(json.error);
    } else {
      // save the user to Localstorage:
      localStorage.setItem("user", JSON.stringify(userData));

      // Update Auth Context:
      login(json);
      setIsLoadingSignin(false);
    }
  };

  return { signin, isLoadingSignin, errorSignin };
}
