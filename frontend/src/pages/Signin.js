import { useState } from "react";
import { Input } from "../components";
import { useSignin } from "../hooks/useSignin";
import background from "../assets/images/Cover.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const initialState = {
  email: "",
  password: "",
};

export default function Signin() {
  const [t, i18n] = useTranslation("global");
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const { signin, isLoadingSignin, errorSignin } = useSignin();
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    await signin(values.email, values.password);
  };

  const changeLanguageHandler = () => {
    const currentLanguage = i18n.language;
    const nextLanguage = currentLanguage === "en" ? "ar" : "en";
    i18n.changeLanguage(nextLanguage);
    const body = document.getElementById("root");
    body.classList.toggle("arabic-mode");
  };

  const onChangeHandler = (event) =>
    setValues({ ...values, [event.target.name]: event.target.value });

  const toggleMemberHandler = () => navigate("/signup");

  return (
    <section className="signup-section">
      <div
        style={{ backgroundImage: `url(${background})` }}
        className="container signup-box"
      >
        {i18n.language === "en" && (
          <div className="signup-lang-btn">
            <button className="btn" onClick={() => changeLanguageHandler()}>
              {t("lang")}
            </button>
          </div>
        )}
        {i18n.language === "en" && (
          <div className="signup-img-box">
            <div className="inner-signup-img-box">
              <svg
                width="70"
                height="66"
                viewBox="0 0 70 66"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  id="logo"
                  d="M63.6364 10.494L27.3318 48.18L13.8409 34.188L18.3273 29.535L27.3318 38.874L59.15 5.874L63.6364 10.494ZM31.8182 59.4C17.7864 59.4 6.36364 47.553 6.36364 33C6.36364 18.447 17.7864 6.6 31.8182 6.6C36.8136 6.6 41.4909 8.118 45.4364 10.725L50.05 5.94C44.8636 2.211 38.5955 0 31.8182 0C14.2545 0 0 14.784 0 33C0 51.216 14.2545 66 31.8182 66C37.3227 66 42.5091 64.548 47.0273 61.974L42.2545 57.024C39.0727 58.542 35.5409 59.4 31.8182 59.4ZM54.0909 42.9H44.5455V49.5H54.0909V59.4H60.4545V49.5H70V42.9H60.4545V33H54.0909V42.9Z"
                  fill="white"
                />
              </svg>
              <h1 className="app-name">{t("YourNotes")}</h1>
            </div>
          </div>
        )}
        {i18n.language === "en" && (
          <div className="signup-form-box">
            <h2 className="form-header">{t(`title`)}</h2>

            <form onSubmit={onSubmitHandler} className="signup-form">
              {errorSignin && <div className="alert">{errorSignin}</div>}
              <>
                {/* EMAIL INPUT */}
                <Input
                  type="email"
                  name="email"
                  labelText={t("Email")}
                  value={values.email}
                  handler={onChangeHandler}
                />

                {/* PASSWORD INPUT */}
                <Input
                  type="password"
                  name="password"
                  labelText={t("Password")}
                  value={values.password}
                  handler={onChangeHandler}
                />

                <button
                  type="submit"
                  onClick={onSubmitHandler}
                  disabled={isLoadingSignin}
                  className="form-btn btn"
                >
                  {t("title")}
                </button>
              </>

              <p>{t("Don'tHaveAnAccount")}</p>

              <button
                className="member-btn btn"
                onClick={toggleMemberHandler}
                type="button"
              >
                {t("Signup")}
              </button>
            </form>
          </div>
        )}
        {i18n.language === "ar" && (
          <div className="signup-form-box">
            <h2 className="form-header">{t(`title`)}</h2>

            <form onSubmit={onSubmitHandler} className="signup-form">
              {errorSignin && <div className="alert">{errorSignin}</div>}
              <>
                {/* EMAIL INPUT */}
                <Input
                  type="email"
                  name="email"
                  labelText={t("Email")}
                  value={values.email}
                  handler={onChangeHandler}
                />

                {/* PASSWORD INPUT */}
                <Input
                  type="password"
                  name="password"
                  labelText={t("Password")}
                  value={values.password}
                  handler={onChangeHandler}
                />

                <button
                  type="submit"
                  onClick={onSubmitHandler}
                  disabled={isLoadingSignin}
                  className="form-btn btn"
                >
                  {t("title")}
                </button>
              </>

              <p>{t("Don'tHaveAnAccount")}</p>

              <button
                className="member-btn btn"
                onClick={toggleMemberHandler}
                type="button"
              >
                {t("Signup")}
              </button>
            </form>
          </div>
        )}
        {i18n.language === "ar" && (
          <div className="signup-lang-btn">
            <button className="btn" onClick={() => changeLanguageHandler()}>
              {t("lang")}
            </button>
          </div>
        )}
        {i18n.language === "ar" && (
          <div className="signup-img-box">
            <div className="inner-signup-img-box">
              <svg
                width="70"
                height="66"
                viewBox="0 0 70 66"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  id="logo"
                  d="M63.6364 10.494L27.3318 48.18L13.8409 34.188L18.3273 29.535L27.3318 38.874L59.15 5.874L63.6364 10.494ZM31.8182 59.4C17.7864 59.4 6.36364 47.553 6.36364 33C6.36364 18.447 17.7864 6.6 31.8182 6.6C36.8136 6.6 41.4909 8.118 45.4364 10.725L50.05 5.94C44.8636 2.211 38.5955 0 31.8182 0C14.2545 0 0 14.784 0 33C0 51.216 14.2545 66 31.8182 66C37.3227 66 42.5091 64.548 47.0273 61.974L42.2545 57.024C39.0727 58.542 35.5409 59.4 31.8182 59.4ZM54.0909 42.9H44.5455V49.5H54.0909V59.4H60.4545V49.5H70V42.9H60.4545V33H54.0909V42.9Z"
                  fill="white"
                />
              </svg>
              <h1 className="app-name">{t("YourNotes")}</h1>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
