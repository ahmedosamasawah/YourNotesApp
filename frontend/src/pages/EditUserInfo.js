import { useEffect, useState } from "react";
import { Input } from "../components";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import { useSignout } from "../hooks/useSignout";
import { useAppContext } from "../context/appContext";
import background from "../assets/images/Dash-Cover.png";
import { useTranslation } from "react-i18next";

export default function EditUserInfo() {
  const { signout } = useSignout();
  const [error, setError] = useState(null);
  const [t, i18n] = useTranslation("global");
  const body = document.getElementById("root");
  const [success, setSuccess] = useState(false);
  const { showUserBar, user, updateUserInfo } = useAppContext();
  const [values, setValues] = useState({ initialState: user.user || user });

  const navigate = useNavigate();
  const logoutBtnHandler = () => {
    signout();
    body.classList.remove("dark-mode");
    navigate("/");
  };

  const backBtnHandler = () => {
    navigate("/home");
  };

  const updateUserHandler = async () => {
    if (!user) return;

    const updatedUser = {};

    if (values.email) {
      updatedUser.email = values.email;
    }

    if (values.password) {
      updatedUser.password = values.password;
    }

    if (values.username) {
      updatedUser.username = values.username;
    }

    if (values.phone) {
      updatedUser.phone = values.phone;
    }

    if (values.birthday) {
      updatedUser.birthday = values.birthday;
    }

    const changesMade = Object.keys(updatedUser).length > 0;

    if (!changesMade) {
      setError("Please make at least one change before saving.");
      return;
    }

    try {
      const response = await fetch(`/api/user/${user.user._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(updatedUser),
      });

      const json = await response.json();

      if (response.ok) {
        updateUserInfo(json.user);
        setSuccess(true);
        setTimeout(() => {
          signout();
          body.classList.remove("dark-mode");
          navigate("/");
        }, 2000);
        console.log("User updated:", json.user);
      } else {
        setError(json.error);
        console.error("Error updating user:", json.error);
      }
    } catch (error) {
      setError(error.message);
      console.error("Error updating user:", error.message);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => {
        setError(false);
      }, 2000);
      return () => clearTimeout(timeout);
    }
    if (success) {
      const timeout = setTimeout(() => {
        setSuccess(false);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [success, error]);

  return (
    <section className="user-sec">
      <NavBar />
      <div
        className="dash-bg-img-box"
        style={{ backgroundImage: `url(${background})` }}
      >
        {showUserBar && (
          <div className="to-position">
            <div className="user-bar-2">
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
              <button onClick={backBtnHandler} className="back-btn btn">
                {t("backHome")}
              </button>
              <button onClick={logoutBtnHandler} className="form-btn btn">
                {t("logout")}
              </button>
            </div>
          </div>
        )}
        <h2 className="user-sec-header">{t("ModifyUserInformation")}</h2>
      </div>
      {error && <p className="alert-2">{error}</p>}
      {success && (
        <p className="alert-success-2">{t("UserUpdatedSuccessfully")}</p>
      )}
      <form className="user-info-form" action="submit">
        <Input
          type="email"
          name="email"
          labelText={t("Email")}
          value={values.email}
          handler={handleInputChange}
          placeholder={user.email || user.user.email}
        />
        <Input
          type="password"
          name="password"
          labelText={t("Password")}
          value={values.password}
          handler={handleInputChange}
          placeholder={t("ChangeYourPasswordHere")}
        />
        <Input
          type="name"
          name="username"
          labelText={t("Username")}
          value={values.username}
          handler={handleInputChange}
          placeholder={user.username || user.user.username}
        />
        <Input
          type="number"
          name="phone"
          labelText={t("Phone")}
          value={values.phone}
          handler={handleInputChange}
          placeholder={user.phone || user.user.phone}
        />
        <Input
          type="number"
          name="birthday"
          labelText={t("BirthdayYear")}
          value={values.birthday}
          handler={handleInputChange}
          placeholder={user.birthday || user.user.birthday}
        />
      </form>
      <button className="btn edit-info-btn" onClick={updateUserHandler}>
        {t("SaveChanges")}
      </button>
    </section>
  );
}
