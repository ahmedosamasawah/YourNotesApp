import { useEffect } from "react";
import { useAppContext } from "../context/appContext";
import { useTranslation } from "react-i18next";

export default function NavBar() {
  const [t, i18n] = useTranslation("global");
  const body = document.getElementById("root");

  const { showUserBarHandler, showUserBar } = useAppContext();

  const changeLanguageHandler = () => {
    const currentLanguage = i18n.language;
    const nextLanguage = currentLanguage === "en" ? "ar" : "en";
    i18n.changeLanguage(nextLanguage);
    body.classList.toggle("arabic-mode");
  };

  const userBtnHandler = () => showUserBarHandler(showUserBar);
  const darkModeClass = "dark-mode";

  useEffect(() => {
    const body = document.getElementById("root");
    const isDarkModeEnabled =
      localStorage.getItem("darkModeEnabled") === "true";
    if (isDarkModeEnabled) {
      body.classList.add(darkModeClass);
    }
  }, []);

  const lightAndDarkModeHandler = () => {
    body.classList.toggle(darkModeClass);
    const isDarkModeEnabled = body.classList.contains(darkModeClass);
    localStorage.setItem("darkModeEnabled", isDarkModeEnabled);
  };

  return (
    <main className="nav">
      <div className="nav-bar">
        <div className="nav-logo-box">
          <div className="logo">
            <svg
              width="25"
              height="25"
              viewBox="0 0 70 66"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                id="logo"
                d="M63.6364 10.494L27.3318 48.18L13.8409 34.188L18.3273 29.535L27.3318 38.874L59.15 5.874L63.6364 10.494ZM31.8182 59.4C17.7864 59.4 6.36364 47.553 6.36364 33C6.36364 18.447 17.7864 6.6 31.8182 6.6C36.8136 6.6 41.4909 8.118 45.4364 10.725L50.05 5.94C44.8636 2.211 38.5955 0 31.8182 0C14.2545 0 0 14.784 0 33C0 51.216 14.2545 66 31.8182 66C37.3227 66 42.5091 64.548 47.0273 61.974L42.2545 57.024C39.0727 58.542 35.5409 59.4 31.8182 59.4ZM54.0909 42.9H44.5455V49.5H54.0909V59.4H60.4545V49.5H70V42.9H60.4545V33H54.0909V42.9Z"
                fill="#d375b9"
              />
            </svg>
          </div>
          <h3>{t("YourNotes")}</h3>
        </div>
        <div className="nav-tools-box">
          <button className="btn" onClick={() => changeLanguageHandler()}>
            {t("lang")}
          </button>
          <div onClick={lightAndDarkModeHandler}>
            {!body.classList.contains(darkModeClass) ? (
              <svg
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  id="Combined Shape"
                  d="M15.3717 0.215831C10.5931 1.19962 7 5.4302 7 10.5C7 16.299 11.701 21 17.5 21C20.4958 21 23.1986 19.7454 25.1116 17.7328C23.2191 22.5722 18.5098 26 13 26C5.8203 26 0 20.1797 0 13C0 5.8203 5.8203 0 13 0C13.81 0 14.6027 0.0740788 15.3717 0.215831Z"
                  fill="#D375B9"
                />
              </svg>
            ) : (
              <svg
                className="margin"
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  id="Combined Shape"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 1C12 0.447715 12.4477 0 13 0C13.5523 0 14 0.447715 14 1V4C14 4.55228 13.5523 5 13 5C12.4477 5 12 4.55228 12 4V1ZM18 13C18 15.7614 15.7614 18 13 18C10.2386 18 8 15.7614 8 13C8 10.2386 10.2386 8 13 8C15.7614 8 18 10.2386 18 13ZM13 21C12.4477 21 12 21.4477 12 22V25C12 25.5523 12.4477 26 13 26C13.5523 26 14 25.5523 14 25V22C14 21.4477 13.5523 21 13 21ZM25 12C25.5523 12 26 12.4477 26 13C26 13.5523 25.5523 14 25 14H22C21.4477 14 21 13.5523 21 13C21 12.4477 21.4477 12 22 12H25ZM5 13C5 12.4477 4.55228 12 4 12H1C0.447715 12 0 12.4477 0 13C0 13.5523 0.447715 14 1 14H4C4.55228 14 5 13.5523 5 13ZM20.7782 3.80761C21.1687 3.41709 21.8019 3.41709 22.1924 3.80761C22.5829 4.19814 22.5829 4.8313 22.1924 5.22183L20.0711 7.34315C19.6805 7.73367 19.0474 7.73367 18.6569 7.34315C18.2663 6.95262 18.2663 6.31946 18.6569 5.92893L20.7782 3.80761ZM7.34315 18.6569C6.95262 18.2663 6.31946 18.2663 5.92893 18.6569L3.80761 20.7782C3.41709 21.1687 3.41709 21.8019 3.80761 22.1924C4.19814 22.5829 4.8313 22.5829 5.22183 22.1924L7.34315 20.0711C7.73367 19.6805 7.73367 19.0474 7.34315 18.6569ZM22.1924 20.7782C22.5829 21.1687 22.5829 21.8019 22.1924 22.1924C21.8019 22.5829 21.1687 22.5829 20.7782 22.1924L18.6569 20.0711C18.2663 19.6805 18.2663 19.0474 18.6569 18.6569C19.0474 18.2663 19.6805 18.2663 20.0711 18.6569L22.1924 20.7782ZM7.34315 7.34315C7.73367 6.95262 7.73367 6.31946 7.34315 5.92893L5.22183 3.80761C4.8313 3.41709 4.19814 3.41709 3.80761 3.80761C3.41709 4.19814 3.41709 4.8313 3.80761 5.22183L5.92893 7.34315C6.31946 7.73367 6.95262 7.73367 7.34315 7.34315Z"
                  fill="#D375B9"
                />
              </svg>
            )}
          </div>

          <div onClick={userBtnHandler}>
            <svg
              width="28"
              height="26"
              viewBox="0 0 28 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="user">
                <path
                  id="Vector"
                  d="M27.5821 25.6668V22.0913C27.5821 20.1948 26.8556 18.3759 25.5624 17.0349C24.2693 15.6938 22.5154 14.9404 20.6866 14.9404H6.89552C5.06672 14.9404 3.31281 15.6938 2.01965 17.0349C0.72649 18.3759 0 20.1948 0 22.0913V25.6668"
                  fill="#D375B9"
                />
                <path
                  id="Vector_2"
                  d="M13.791 12.2587C17.1761 12.2587 19.9203 9.5145 19.9203 6.12935C19.9203 2.7442 17.1761 0 13.791 0C10.4058 0 7.66162 2.7442 7.66162 6.12935C7.66162 9.5145 10.4058 12.2587 13.791 12.2587Z"
                  fill="#D375B9"
                />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </main>
  );
}
