import Head from "next/head";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "../Redux/store";
import styles from "./CSS/App.module.scss";
import Home from "./Components/Home";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import "./globalStyle.scss";

function MyApp() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 700) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      <Head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="https://clipboardhealth.com/wp-content/uploads/2020/05/CBH-Webclip.png"
        />
        <title>ClipBoardHealth: Lorenzo Blanda</title>
        <noscript>You need to enable JavaScript to run this app.</noscript>
      </Head>
      <Provider store={store}>
        <div className={styles.App}>
          <NavBar />
          <div className={styles.Main}>
            <Home />
          </div>
          <Footer />
          {showButton && (
            <button onClick={scrollToTop} className={styles.backtotop}>
              &#8679;
            </button>
          )}
        </div>
      </Provider>
    </>
  );
}

export default MyApp;
